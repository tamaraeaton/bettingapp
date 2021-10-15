import React, { useContext } from "react";
import { useState } from "react";
import "./ContactForm.css";
import emailjs from "emailjs-com";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";

const ContactForm = () => {
  const { notify } = useContext(AppContext);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_jnamkjr",
        "contact_form",
        e.target,
        "user_gLijcxJArp8D3cOxScjvm"
      )
      .then((res) => {
        notify("Email sent", "e");
        console.log(res.text);
        history.goBack();
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };

  return (
    <div className="general flex-component custom-form-page">
      <h1 className="contact-form-title">
        Please feel free to contact us with your questions or comments.
      </h1>
      <form onSubmit={handleSubmit} className="contact-form custom-form">
        <input
          className="custom-input"
          type="text"
          placeholder="User Name"
          name="user_name"
          required
        />
        <input
          className="custom-input"
          type="text"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className="custom-input"
          type="text"
          placeholder="Subject"
          name="subject"
          required
        />
        <textarea
          rows="5"
          placeholder="Comment..."
          className="comment-textarea"
          name="text"
          required
        />
        <input
          className="general-button general-button-custom"
          type="submit"
          value="Send Message"
        />
      </form>
    </div>
  );
};
export default ContactForm;
