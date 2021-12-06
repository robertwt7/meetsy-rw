import { Link, routes } from '@redwoodjs/router'
import { Form, TextField, Submit, TextAreaField, FieldError, FormError, useForm} from '@redwoodjs/forms'
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
      formMethods.reset()
    }
  })
  const formMethods = useForm({mode: 'onBlur'})
  const onSubmit = (data) => {
    create({variables: { input: data}})
  }



  return (
    <>
    <Toaster />
    <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
      <FormError
        error={error}
        wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
      />

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
