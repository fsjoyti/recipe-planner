import "./Login.css"
import React, {useRef, useState} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"

const Login = ()=>{

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const submitHandler = async (e) =>{
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return(
        <div className="w-100 login-div">
            <h1 className="text-center mb-4">Login Page</h1>
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
                <Button id="login" disabled={loading} className="w-100" variant="primary" type="submit" onClick={(e)=>submitHandler(e)}>
                    Log In
                </Button>
            </Form>
            <div className="w-100 text-center mt-2">
                No account? <Link to = "/signup">Sign Up</Link>
            </div>
        </div>

    )
}

export default Login