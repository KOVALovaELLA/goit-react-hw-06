import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsOps";

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    number: Yup.string().required("Number is required"),
  });

  const handleAdd = (values, actions) => {
    const { name, number } = values;
    dispatch(addContact({ name, number }));
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
