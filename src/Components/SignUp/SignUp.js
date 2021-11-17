import "./SignUp.css"
import React, {useRef, useState} from "react";
import {Form, Button, Alert, Row, Col} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import {useHistory} from "react-router-dom"
import {ArrowRight} from 'react-bootstrap-icons';
import StyledLink from "../StyledLink/StyledLink";
import food from "../../assets/images/food.svg"
import groceryBag from "../../assets/images/groceries-bag.svg"
import noteBook from "../../assets/images/notebook.svg"
import {firestore} from "../../firebase";

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

        if (passwordRef.current.value.length < 8) {
            return setError("Password must be atleast 8 characters")
        }

        try {
            setError("")
            setLoading(true)
            const res = await signup(emailRef.current.value, passwordRef.current.value)
            const user = res.user;
            console.log(user)

            // await firestore.collection("users").doc(user.uid).set({
            //     email: user.email,
            //     uid: user.uid
            // });

            history.push("/")

        } catch (error) {
            console.error(error)

            setError("Failed to create an account")
            setLoading(false)
        }
    }

    return (
        <div id="signup-main-container">
            <div className="content">
                <div className="leftText">
                    <img src={food} alt="food-covered" className="signup-img"/>
                    <p>Plan your dinner, by searching from hundreds of recipes in our app</p>
                </div>
                <div className="leftText">
                    <img src={groceryBag} alt="grocery bag with food" className="signup-img"/>
                    <p>Plan for your next grocery shopping for the recipes in the app</p>
                </div>
                <div className="leftText">
                    <img src={noteBook} alt="notebook" className="signup-img"/>
                    <p>Save your favorite recipe that you found in one place in our app</p>
                </div>
            </div>
            <div className="signup-div">
                <h1 className="mb-4" id="header-text"> Sign up</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail" id="email">
                        <Col sm="12">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" className="form-input" ref={emailRef}
                                          required/>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicPassword" id="password">
                        <Col sm="12">
                            <Form.Label> Enter Password</Form.Label>
                            <Form.Control type="password" placeholder="●●●●●●●●●●●●" className="form-input"
                                          ref={passwordRef} required/>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} controlId="formPassword Confirm" className="mb-3" id="password-confirm">
                        <Col sm="12">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="●●●●●●●●●●●●" className="form-input"
                                          ref={passwordConfirmRef} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm="12">
                            <Button id="signup" disabled={loading} variant="primary" type="submit"
                                    onClick={(e) => submitHandler(e)}>
                                Sign Up
                            </Button><br/>
                        </Col>
                    </Form.Group>
                    <Form.Text className="text-muted">
                        By continuing, you agree to The Terms of Service and Privacy Statement.
                    </Form.Text>
                </Form>
                <div className="text-center" id="signed-up">
                    <p id="have-account">Have an account? </p><StyledLink to="/login">Log In<ArrowRight
                    className="ml-4"/></StyledLink>
                </div>
            </div>
        </div>
    )
}

export default SignUp

