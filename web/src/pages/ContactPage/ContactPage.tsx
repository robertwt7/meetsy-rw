import { Link, routes } from '@redwoodjs/router'
import { Form, TextField, Submit, TextAreaField, FieldError} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import {Toaster, toast} from "@redwoodjs/web/toast"

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, {loading, error}] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success("Thank you for your submission!")
    }
  })

  const onSubmit = (data) => {
    create({variables: { input: data}})
  }

  console.log("Loading state: ", loading);


  return (
    <>
    <Toaster />
    <Form onSubmit={onSubmit} config={{mode: 'onBlur'}}>
      <label htmlFor="name">Name</label>
      <TextField name="name" validation={{required: true}} errorClassName="error" />
      <FieldError name="name" className="error" />

      <label htmlFor="email">Email</label>
      <TextField
        name="email"
        validation={{
          required: true,
          pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Invalid email address'
          }
        }}
        errorClassName="error" />
      <FieldError name="email" className="error" />

      <label htmlFor="message">Message</label>
      <TextAreaField name="message" validation={{required: true}} errorClassName="error" />
      <FieldError name="message" className="error" />

      <Submit disabled={loading}>Save</Submit>
    </Form>
    </>
  )
}

export default ContactPage
