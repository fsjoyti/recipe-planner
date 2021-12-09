import "./Login..css"
import React, {useState} from "react";
import {Form, Button, Alert, Row, Col} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import StyledLink from "../StyledLink/StyledLink";
import { useHistory } from "react-router-dom";

const Login = ()=>{

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleEmailChange= (e)=>{
        setEmail(e.target.value)
    }

    const handlePasswordChange =(e)=>{
        setPassword(e.target.value)
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            setError("")
            setLoading(true)
            await login(email, password);
            setLoading(false);
            history.push("/");
        } catch {
            setError("Failed to log in");
            setLoading(false);
        }
    }

    return(
        <div className="login-div">
            <h1 className="mb-4">Login Page</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group  as={Row} className="mb-3" controlId="formBasicEmail" id="email">
                    <Col sm="12">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" className="form-input form-control-lg" onChange={handleEmailChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicPassword" id="password">
                    <Col sm="12">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className="form-input form-control-lg" placeholder="●●●●●●●●●●●●" onChange={handlePasswordChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="12">
                        <Button id="login" disabled={loading} className="w-100" variant="primary" type="submit" onClick={submitHandler}>
                            Log In
                        </Button>
                    </Col>
                </Form.Group>

            </Form>
            <div className="w-100 text-center mt-2" id ="notLoggedIn">
                <p>No account?</p> <StyledLink to = "/signup">Sign Up</StyledLink>
            </div>
        </div>

    )
}

export default Login