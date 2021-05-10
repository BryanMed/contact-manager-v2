import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { userSchema } from "../validations/UserValidation";

const ContactsForm = (props) => {
  const initialStateValues = {
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
  };
  const [values, setValues] = useState(initialStateValues);

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailValidMsg, setEmailValidMsg] = useState("");

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    if (emailRegex.test(event)) {
      setEmailIsValid(true);
      setEmailValidMsg("Your email looks good");
    } else {
      setEmailIsValid(false);
      setEmailValidMsg("Please enter a valid email");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("contacts").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <h3>
        {" "}
        <i className="material-icons">face</i> Contact
      </h3>
      <div className="form-group input-group">
        <div className="row">
          <div className="col-sm">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="first name"
              name="firstName"
              onChange={handleInputChange}
              value={values.firstName}
            />
          </div>
          <div className="col-sm">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="last name"
              name="lastName"
              onChange={handleInputChange}
              value={values.lastName}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          className="form-control"
          placeholder="company"
          name="company"
          onChange={handleInputChange}
          value={values.company}
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          className="form-control"
          placeholder="phone number"
          name="phone"
          onChange={handleInputChange}
          value={values.phone}
        />
      </div>
      <br />

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="email"
          name="email"
          onChange={handleInputChange}
          value={values.email}
        />
      </div>
      <br />
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Save new contact" : "Update contact"}
      </button>
    </form>
  );
};
export default ContactsForm;
