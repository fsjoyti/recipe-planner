import "./SignUp.css"
import React, {useRef, useState} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"
import { ArrowRight } from 'react-bootstrap-icons';

const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const submitHandler = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        if(passwordRef.current.value.length < 8){
            return setError("Password must be atleast 8 characters")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <div className="w-100 signup-div">
            <h1 className="text-center mb-4"> Sign up</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail" id="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" className="form-input" ref={emailRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="●●●●●●●●●●●●" ref={passwordRef} required/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" placeholder="●●●●●●●●●●●●" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button id="signup" disabled={loading} className="w-100" variant="primary" type="submit" onClick={(e)=>submitHandler(e)}>
                    Sign Up
                </Button><br/>
                <Form.Text className="text-muted">
                    By continuing, you agree to The Terms of Service and Privacy Statement.
                </Form.Text>
            </Form>
            <div className="w-100 text-center mt-2">
                Have an account? <Link to="/login">Log In<ArrowRight className="ml-4"></ArrowRight></Link>
            </div>
        </div>
    )
}

export default SignUp

