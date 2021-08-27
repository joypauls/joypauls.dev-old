import React from "react";
import {
  Box,
  Flex,
  Button,
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
} from 'theme-ui'

const formStyle = {
  textAlign: 'left'
}
const buttonStyle = {
  margin: '1rem',
  textAlign: 'center',
}

const ContactForm = () => (
  <Flex sx={{ alignItems: "center", justifyContent: "center"}}>
    <Box as="form" onSubmit={(e) => e.preventDefault()} sx={{width: ['100%', '75%', '50%'],}}>
      <Label htmlFor="name">Name</Label>
      <Input name="name" id="name" mb={3} />
      <Label htmlFor="email">Email Address</Label>
      <Input name="email" id="email" mb={3} />
      <Label htmlFor="comment">Comment</Label>
      <Textarea name="comment" id="comment" rows={6} mb={3} />
      <Button>Submit</Button>
    </Box>
  </Flex>
);

export default ContactForm;
