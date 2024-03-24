/* Contact.jsx */

/* import React from "react";
import styles from "./Contact.module.css";

const Contact = ({ contact, onDeleteContact }) => {
  return (
    <div className={styles.contact}>
      <span className={styles["contact-name"]}>{contact.name}</span>
      <span className={styles["contact-number"]}>{contact.number}</span>
      <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
    </div>
  );
};

export default Contact;
 */
/* Contact.jsx */

import { useDispatch } from "react-redux";
import styles from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={styles.contact}>
      <span className={styles["contact-name"]}>{contact.name}</span>
      <span className={styles["contact-number"]}>{contact.number}</span>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default Contact;
