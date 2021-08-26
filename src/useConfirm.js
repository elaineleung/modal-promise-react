import { useContext, useEffect, useState } from "react";
import { ConfirmContext } from "./ConfirmContextProvider";

const useConfirm = () => {
  const [confirm, setConfirm] = useContext(ConfirmContext);
  const [needsCleanup, setNeedsCleanup] = useState(false);

  const isConfirmed = (prompt) => {
    const promise = new Promise((resolve, reject) => {
      setConfirm({ prompt, isOpen: true, proceed: resolve, cancel: reject });
      setNeedsCleanup(true);
    });

    const reset = () => {
      setConfirm({ prompt: "", proceed: null, cancel: null, isOpen: false });
      setNeedsCleanup(false);
    };

    return promise.then(
      () => {
        reset();
        return true;
      },
      () => {
        reset();
        return false;
      }
    );
  };

  // Call cancel in a cleanup func to avoid dangling confirm dialog
  useEffect(() => {
    return () => {
      if (confirm.cancel && needsCleanup) {
        confirm.cancel();
      }
    };
  }, [confirm, needsCleanup]);

  return {
    ...confirm,
    isConfirmed
  };
};

export default useConfirm;
