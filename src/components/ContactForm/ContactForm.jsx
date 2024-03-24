/* import { Formik, Form, Field } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContacts } from "../../redux/contactsSlice";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();
  const handleAdd = (value, actions) => {
    dispatch(addContacts(value));
    actions.resetForm();
  };
  return (
    <Formik initialValues={{ name: "", number: "" }} onSubmit={handleAdd}>
      <Form className={css.form}>
        <div className={css.field}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field type="text" name="name" id={nameFieldId} />
        </div>
        <div className={css.field}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field type="text" name="number" id={numberFieldId} />
        </div>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
 */
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
      validationSchema={validationSchema}
    >
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
