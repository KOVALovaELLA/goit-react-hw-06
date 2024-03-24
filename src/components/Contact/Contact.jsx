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
import { FaPhoneAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContacts } from "../../redux/contactsSlice";

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContacts(id));
  };
  return (
    <div className={css.box}>
      <div>
        <p>
          <IoPerson className={css.icon} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={css.icon} />
          {number}
        </p>
      </div>
      <button className={css.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
