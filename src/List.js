import React, { useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import useConfirm from "./useConfirm";

const initialState = [
  { id: 1, text: "This is a list item (1)" },
  { id: 2, text: "This is a list item (2)" },
  { id: 3, text: "This is a list item (3)" },
  { id: 4, text: "This is a list item (4)" }
];

const List = () => {
  const [listItems, setListItems] = useState(initialState);
  const { isConfirmed } = useConfirm();

  const handleRemove = async (id) => {
    const confirmed = await isConfirmed("Are you sure?");

    if (confirmed) {
      setListItems((cur) => cur.filter((item) => item.id !== id));
    }
  };

  return (
    <ListGroup>
      {listItems.map(({ id, text }) => (
        <ListGroupItem key={id} className="d-flex align-items-center">
          <div>{text}</div>
          <Button
            color="link"
            onClick={() => handleRemove(id)}
            className="ml-auto"
          >
            Remove
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default List;
