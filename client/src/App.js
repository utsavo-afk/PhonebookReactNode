import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Notification from "./components/Notification";
import { getAll } from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAll()
      .then((fetchedContacts) => setContacts(fetchedContacts))
      .catch(() => console.log("failed to fetch data"));
  }, []);

  const [newNumber, setNumber] = useState("add number...");
  const [newName, setName] = useState("add name...");
  const [searchString, setSearchString] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    type: "",
    message: "",
  });
  return (
    <div>
      <h1>phonebook</h1>

      <Notification notification={alertMessage} />

      <Contacts
        contacts={contacts}
        searchString={searchString}
        setSearchString={setSearchString}
        setContacts={setContacts}
        setAlertMessage={setAlertMessage}
        alertMessage={alertMessage}
      />

      <ContactForm
        contacts={contacts}
        setContacts={setContacts}
        newNumber={newNumber}
        setNumber={setNumber}
        newName={newName}
        setName={setName}
        setAlertMessage={setAlertMessage}
        alertMessage={alertMessage}
      />
    </div>
  );
};

export default App;
