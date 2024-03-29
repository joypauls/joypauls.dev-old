import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Label,
  Input,
  Textarea,
} from "theme-ui";


const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const validateEmail = (s) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(s);
}

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  }
  
  const handleSubmit = (e) => {
    if (name === "" || email === "" || message === "") {
      alert("Please fill out all fields, thank you!")
    } if (validateEmail(email)) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", "name": name, "email": email, "message": message })
      })
        .then(() => {
          alert(`Sent!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n`)
          resetForm();
        })
        .catch(error => alert(error));
      // alert(`Name: ${name}\nEmail: ${email}\nComment: ${comment}\n\nNot implemented oops!\nSee why here https://youtu.be/dQw4w9WgXcQ`);
    } else {
      alert("That doesn't look like a valid email");
    }
    e.preventDefault();
  }

  return(
    <Flex sx={{ alignItems: "center", justifyContent: "center"}}>
      <Box as="form" onSubmit={handleSubmit} sx={{width: ['100%', '75%', '50%'],}} name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact" />
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" mb={3} value={name} onChange={e => setName(e.target.value)}/>
        <Label htmlFor="email">Email Address</Label>
        <Input name="email" id="email" mb={3} value={email} onChange={e => setEmail(e.target.value)}/>
        <Label htmlFor="message">Message</Label>
        <Textarea name="message" id="comment" rows={6} mb={3} value={message} onChange={e => setMessage(e.target.value)}/>
        <Button type="submit">Submit</Button>
      </Box>
    </Flex>
  );
}

export default ContactForm;
