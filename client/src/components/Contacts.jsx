import React from "react";
import SearchBar from "./SearchBar";
import Contact from "./Contact";

const Contacts = (props) => {
  const { contacts, setContacts } = props;
  const { searchString, setSearchString } = props;
  const { alertMessage, setAlertMessage } = props;

  if (contacts.length === 0) {
    return (
      <div>
        <h2>Contacts</h2>
        <p>There are no contacts</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Contacts</h2>
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <ul>
        {searchString
          ? contacts
              .filter((contact) =>
                contact.name.toLowerCase().includes(searchString.toLowerCase())
              )
              .map((contact) => (
                <Contact
                  key={contact.id}
                  name={contact.name}
                  number={contact.number}
                  contacts={contacts}
                  alertMessage={alertMessage}
                  setAlertMessage={setAlertMessage}
                />
              ))
          : contacts.map((contact) => (
              <Contact
                key={contact.id}
                contacts={contacts}
                setContacts={setContacts}
                id={contact.id}
                name={contact.name}
                number={contact.number}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
              />
            ))}
      </ul>
    </div>
  );
};

export default Contacts;
