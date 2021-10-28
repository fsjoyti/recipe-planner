import "./Home.css"
import {Button, Alert} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"
import axios from 'axios'
import React, {useState, useEffect} from "react";
const Home = () => {

    console.log(process.env.REACT_APP_SPOONACULAR_API_KEY)

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    useEffect( ()=>{

        const getRecipes = async ()=>{
            const response =  await axios.get("https://api.spoonacular.com/recipes/random",{params: {number:1, tags:"vegetarian",apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY}})
            return response.data
        }
        
        getRecipes().then(response => {
            console.log(response)
            }
        ).catch(error => {
            console.log(error)
        })
     
    }, []);

    
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