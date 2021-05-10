import React, { useEffect, useState } from "react";
import ContactsForm from "./ContactsForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEdit = async (contactObject) => {
    if (currentId === "") {
      await db.collection("contacts").doc().set(contactObject);
      toast("New contact added", {
        type: "success",
        autoClose: 1000,
      });
    } else {
      await db.collection("contacts").doc(currentId).update(contactObject);
      toast("Contact updated succesfully", {
        type: "info",
        autoClose: 1000,
      });
      setCurrentId("");
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("are you sure you want to delete this user?")) {
      await db.collection("contacts").doc(id).delete();
      toast("Contact removed succesfully", {
        type: "error",
        autoClose: 1000,
      });
    }
  };

  const getContacts = async () => {
    db.collection("contacts").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setContacts(docs);
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container py-10">
      <div className="row">
        <div className="col-4">
          <ContactsForm {...{ addOrEdit, currentId, contacts }} />
        </div>
        <div className="col-8">
          <div className="container col-md-8">
            <h1>Contacts</h1>
            {contacts.map((contact) => (
              <div className="card mb-1" key={contact.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4>
                      {contact.firstName} {" " + contact.lastName}
                    </h4>
                    <div>
                      <i
                        className="material-icons text-danger"
                        onClick={() => deleteContact(contact.id)}
                      >
                        close
                      </i>
                      <i
                        className="material-icons"
                        onClick={() => setCurrentId(contact.id)}
                      >
                        create
                      </i>
                    </div>
                  </div>

                  <h5>{contact.company}</h5>
                  <div>
                    <p>{contact.phone}</p>
                    <p>{contact.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
