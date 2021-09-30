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
    <div className='general flex-component'>
      <h1>This is where you can send me an email.</h1>
      <form onSubmit={handleSubmit} className='contact-form custom-form'>
        <label>Name</label>
        <input type='text' name='user_name' />
        <label>Email</label>
        <input type='text' name='user_email' />
        <label>Subject</label>
        <input type="text" name="subject" />
        <label>Comment</label>
        <input type='text' name='text' />
        <input type='submit' value='Send Message' />
      </form>
    </div>
  );
};
export default ContactForm;
