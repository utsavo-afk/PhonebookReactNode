import React from "react";
import { createContact, updateContact } from "../services/contacts";

const ContactForm = (props) => {
  const {
    contacts,
    newName,
    newNumber,
    setContacts,
    setName,
    setNumber,
    setAlertMessage,
    alertMessage,
  } = props;

  const checkDuplicate = (arr, _name, _number) => {
    return arr.some((el) => el.name === _name || el.number === _number);
  };

  const addContact = (e) => {
    e.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber,
    };
    const { name, number } = contactObject;
    if (name === "" || number === "") {
      setAlertMessage({
        ...alertMessage,
        type: "error",
        message: "Name/Number cannot be blank!",
      });
      setTimeout(() => setAlertMessage({ ...alertMessage, message: "" }), 2000);
      return;
    }
    if (checkDuplicate(contacts, name, number)) {
      if (window.confirm(`Update ${name}'s contact?`)) {
        const contact = contacts.find((contact) => contact.name === name);
        const { id } = contact;
        const updateNumber = window.prompt(`Enter new number`);
        const updatedContact = { ...contact, number: updateNumber };
        return (
          updateContact(id, updatedContact)
            // .then(res => setContacts(contacts.map(c => c.id !== id ? c : res)))
            .then((res) => {
              setContacts(contacts.map((c) => (c.id !== id ? c : res)));
              setAlertMessage({
                ...alertMessage,
                type: "success",
                message: `${name}'s contact was updated`,
              });
              setTimeout(
                () => setAlertMessage({ ...alertMessage, message: "" }),
                2000
              );
            })
            .catch((error) => {
              setAlertMessage({
                ...alertMessage,
                type: "error",
                message: error.response.data.error,
              });
              setTimeout(
                () => setAlertMessage({ ...alertMessage, message: "" }),
                2000
              );
              // setContacts(contacts.filter(c => c.name !== name))
            })
        );
      } else {
        console.log("update cancelled");
      }
      setName("");
      setNumber("");
    }
    return createContact(contactObject)
      .then((res) => {
        setContacts(contacts.concat(res));
        setAlertMessage({
          ...alertMessage,
          type: "success",
          message: `${res.name} was added to contacts`,
        });
        setTimeout(
          () => setAlertMessage({ ...alertMessage, message: "" }),
          2000
        );
      })
      .catch((error) => {
        console.log("contact addition failed!");
        setAlertMessage({
          ...alertMessage,
          type: "error",
          message: error.response.data.error,
        });
        setTimeout(
          () => setAlertMessage({ ...alertMessage, message: "" }),
          2000
        );
      });
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={addContact}>
        <div>
          <label htmlFor="name">name </label>
          <input
            name="contact_name"
            id="name"
            value={newName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="number">number </label>
          <input
            name="contact_number"
            id="number"
            value={newNumber}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default ContactForm;
