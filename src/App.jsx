import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import css from "./App.module.css";
export default function App() {
  return (
    <div>
      <h1 className={css.h1}>Phonebook</h1>
      <ContactForm />

      <SearchBox />
      <ContactList />
    </div>
  );
}
