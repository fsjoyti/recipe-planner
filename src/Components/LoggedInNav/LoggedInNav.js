import {Button, Alert, Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import {Link, NavLink, useHistory} from "react-router-dom"
import React, {useState} from "react";
const LoggedInNav = () =>{
    const [error, setError] = useState("");
    const {logout } = useAuth();
    const history = useHistory();

    const handleLogOut = async (event) => {
        setError("");
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
            window.alert(error)
        }
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand  as={Link} to='/'>Recipe-Planner</Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
                    <Nav.Link as={NavLink} to='/mealplan'>MealPlan</Nav.Link>
                    <Nav.Link as={NavLink} to='/savedRecipes'>Saved Recipes</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="light" onClick={(e)=>handleLogOut(e)}>
                                 Log Out
                            </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default LoggedInNav