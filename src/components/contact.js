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

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", "name": name, "email": email, "message": message })
    })
      .then(() => alert(`Sent!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n`))
      .catch(error => alert(error));
    e.preventDefault();
    // alert(`Name: ${name}\nEmail: ${email}\nComment: ${comment}\n\nNot implemented oops!\nSee why here https://youtu.be/dQw4w9WgXcQ`);
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
