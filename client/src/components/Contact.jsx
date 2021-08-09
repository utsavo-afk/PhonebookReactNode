import React from "react";
import { delContact } from "../services/contacts";

const Contact = (props) => {
  const {
    name,
    number,
    id,
    contacts,
    setContacts,
    setAlertMessage,
    alertMessage,
  } = props;

  const deleteContact = (id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      return delContact(id)
        .then(() => setContacts(contacts.filter((c) => c.id !== id)))
        .then(() => {
          setAlertMessage({
            ...alertMessage,
            type: "success",
            message: `${name} deleted successfully`,
          });
          setTimeout(
            () => setAlertMessage({ ...alertMessage, message: "" }),
            2000
          );
        })
        .catch((error) => {
          setAlertMessage({
            ...alertMessage,
            type: "success",
            message: error.res.data,
          });
          setTimeout(
            () => setAlertMessage({ ...alertMessage, message: "" }),
            2000
          );
        });
    }
    return console.log("cancelled delete operation");
  };

  return (
    <li>
      <span>
        {name} {number}
      </span>{" "}
      <button onClick={(_) => deleteContact(id)}>delete</button>
    </li>
  );
};

export default Contact;
