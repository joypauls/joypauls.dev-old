import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Label,
  Input,
  Textarea,
} from "theme-ui";


const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nEmail: ${email}\nComment: ${comment}\n\nNot implemented oops!\nSee why here https://youtu.be/dQw4w9WgXcQ`);
  }

  return(
    <Flex sx={{ alignItems: "center", justifyContent: "center"}}>
      <Box as="form" onSubmit={handleSubmit} sx={{width: ['100%', '75%', '50%'],}}>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" mb={3} value={name} onChange={e => setName(e.target.value)}/>
        <Label htmlFor="email">Email Address</Label>
        <Input name="email" id="email" mb={3} value={email} onChange={e => setEmail(e.target.value)}/>
        <Label htmlFor="comment">Comment</Label>
        <Textarea name="comment" id="comment" rows={6} mb={3} value={comment} onChange={e => setComment(e.target.value)}/>
        <Button sx={{backgroundColor: `tagBackground`}} type="submit">Submit</Button>
      </Box>
    </Flex>
  );
}

export default ContactForm;
