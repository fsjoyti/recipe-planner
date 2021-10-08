import "./Home.css"
import {Button, Alert} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"
import React, {useState} from "react";

const Home = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogOut = async (event) => {

        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser && currentUser.email}
            <Button variant="link" onClick={(e)=>handleLogOut(e)}>
                Log Out
            </Button>
        </div>
    )
}

export default Home