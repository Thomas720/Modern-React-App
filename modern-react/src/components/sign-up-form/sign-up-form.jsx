import { useState } from 'react'

import {
  createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
  
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

const defaultFormFiels = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFiels, setFormField] = useState(defaultFormFiels)
  const { displayName, email, password, confirmPassword } = formFiels

  console.log(formFiels)

  const resetFormField = () => {
    setFormField(defaultFormFiels)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('password do not match')
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormField()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      }
      console.log('user creation encountered an error', error)
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormField({
      ...formFiels,
      [name]: value,
    })
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
