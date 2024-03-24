# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!--  -->

/_ main.jsx _/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<App />
</PersistGate>
</Provider>
</React.StrictMode>
);
/_ App.jsx _/
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

<!-- in map Redux: contactsSlice.js, filtersSlice.js, store.js -->

/_ contactsSlice.js _/
import { createSlice, nanoid } from "@reduxjs/toolkit";

const contactsInitialState = [
{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
{ id: "id-2", name: "Hermione Kline", number: "443-89-12" },
{ id: "id-3", name: "Eden Clements", number: "645-17-79" },
{ id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const contactsSlice = createSlice({
name: "contacts",
initialState: { items: contactsInitialState },
reducers: {
addContacts: {
reducer(state, action) {
state.items.push(action.payload);
},
prepare(value) {
return {
payload: {
...value,
id: nanoid(),
},
};
},
},
deleteContacts(state, action) {
state.items = state.items.filter(
(contact) => contact.id !== action.payload
);
},
},
});

export const { addContacts, deleteContacts } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export default contactsSlice.reducer;
/_ filtersSlice.js _/
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
name: "filters",
initialState: { text: "" },
reducers: {
setStatusFilter(state, action) {
state.text = action.payload;
},
},
});

export const { setStatusFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
/_ store.js _/
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

const contactsPersistConfig = {
key: "contacts",
storage,
whiteList: ["items"],
};
const persistedContactsReducer = persistReducer(
contactsPersistConfig,
contactsReducer
);

export const store = configureStore({
reducer: {
contacts: persistedContactsReducer,
filters: filtersReducer,
},
});

export const persistor = persistStore(store);

<!-- map Components -->

/_ Contact.jsx _/
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
/* ContactForm.jsx */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContacts } from "../../redux/contactsSlice";
import css from "./ContactForm.module.css";

export default function ContactForm() {
const nameFieldId = useId();
const numberFieldId = useId();
const dispatch = useDispatch();

const validationSchema = Yup.object({
name: Yup.string().required("Name is required"),
number: Yup.string().required("Number is required"),
});

const handleAdd = (values, actions) => {
dispatch(addContacts(values));
actions.resetForm();
};

return (
<Formik
initialValues={{ name: "", number: "" }}
onSubmit={handleAdd}
validationSchema={validationSchema} >

<Form className={css.form}>
<div className={css.field}>
<label htmlFor={nameFieldId}>Name:</label>
<Field type="text" name="name" id={nameFieldId} />
<ErrorMessage name="name" component="div" className={css.error} />
</div>
<div className={css.field}>
<label htmlFor={numberFieldId}>Number:</label>
<Field type="text" name="number" id={numberFieldId} />
<ErrorMessage name="number" component="div" className={css.error} />
</div>
<button type="submit" className={css.btn}>
Add contact
</button>
</Form>
</Formik>
);
}
/* ContactList.jsx */
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
/* SearchBox.jsx */
import { useDispatch } from "react-redux";
import { setStatusFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";
import { useState } from "react";

export default function SearchBox() {
const [value, setValue] = useState("");
const dispatch = useDispatch();
const handleChange = (event) => {
const inputValue = event.target.value;
setValue(inputValue);
dispatch(setStatusFilter(inputValue));
};

return (
<div>
<p className={css.label}>Find contacts by name:</p>
<input
        className={css.input}
        type="text"
        value={value}
        onChange={handleChange}
      ></input>
</div>
);
}
