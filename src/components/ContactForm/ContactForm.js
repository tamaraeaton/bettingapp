import React from "react";
import { useState } from "react";
import "./ContactForm.css";
import emailjs from "emailjs-com";

const ContactForm = () => {
  // const [msg, setMsg] = useState({
  //   name: "",
  //   email: "",
  //   text: "",
  //   disabled: false,
  //   emailSent: false,
  // });

  // const handleChange = (e) => {
  //   setMsg({
  //     ...msg,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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
        console.log(res.text);
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };

  return (
    <div className='general flex-component custom-form-page'>
      <h1 className="contact-form-title">Please feel free to contact us with your questions
        or comments. We will reply within 2-4 days.</h1>
      <form onSubmit={handleSubmit} className='contact-form custom-form'>
        <label>Name</label>
        <input className="textarea" type='text' name='user_name' required />
        <label>Email</label>
        <input className="textarea" type='text' name='user_email' required />
        <label>Subject</label>
        <input className="textarea" type="text" name="subject" required />
        <label>Comment</label>
        <input className="textarea" type='text' name='text' required />
        <input className="send-message-button custom-button" type='submit' value='Send Message' />
      </form>
    </div>
  );
};
export default ContactForm;
