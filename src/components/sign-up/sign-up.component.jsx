
import { Component } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'

class SignUp extends Component {
    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confimpassword: ''
        }
    }

    handlerSubmit = async event => {
        event.preventDefault()

        const {displayName, email, password, confimpassword } = this.state

        if (password !== confimpassword) {
            alert("passwords don't match");
            return;
        }

        try {
          const {user} = await auth.createUserWithEmailAndPassword(email, password)

          await createUserProfileDocument(user, {displayName})

          this.setState({
            displayName: '',
            email: '',
            password: '',
            confimpassword: ''
          })
        } catch (error) {
            console.error('Sign UP', {error})
        }
    }

    handlerChange = event => {
        const {name, value} = event.target

        this.setState({[name]: value})
    }

    render() {
        const {displayName, email, password, confimpassword } = this.state

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handlerSubmit}>
                    <FormInput
                      type='text'
                      name='displayName'
                      value={displayName}
                      onChange={this.handlerChange}
                      label='Display Name'
                      required
                    />
                    <FormInput
                      type='email'
                      name='email'
                      value={email}
                      onChange={this.handlerChange}
                      label='Email'
                      required
                    />
                    <FormInput
                      type='password'
                      name='password'
                      value={password}
                      onChange={this.handlerChange}
                      label='Password'
                      required
                    />
                    <FormInput
                      type='password'
                      name='confimpassword'
                      value={confimpassword}
                      onChange={this.handlerChange}
                      label='Confirm password'
                      required
                    />
                    <CustomButton type='submit'>Sign up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp