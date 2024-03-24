import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector((state) => {
    const filter = state.filters.text;
    if (filter) {
      return state.contacts.items.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return state.contacts.items;
    }
  });

  return (
    <ul className={css.list}>
      {contacts.map((contact) => (
        <li className={css.item} key={contact.id}>
          <Contact
            name={contact.name}
            number={contact.number}
            id={contact.id}
          />
        </li>
      ))}
    </ul>
  );
}
