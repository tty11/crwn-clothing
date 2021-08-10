import { Component } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sing-in.styles.scss'
import { signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handlerSubmit = event => {
        event.preventDefault()

        this.setState({email: '', password: ''})
    }

    handlerChange = event => {
        const {value, name} = event.target

        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email ans password</span>

                <form onSubmit={this.handlerSubmit}>
                    <FormInput
                        name='email' 
                        type='email'
                        label='Email'
                        value={this.state.email}
                        handlerChange={this.handlerChange}
                        required
                    />
                    <FormInput
                        name='password' 
                        type='password'
                        label='Password'
                        value={this.state.password}
                        handlerChange={this.handlerChange}
                        required
                    />

                    <div className="buttons">
                        <CustomButton type='submit'>
                            Sign In
                        </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn