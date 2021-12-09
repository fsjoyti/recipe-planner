import {Button, Alert, Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import {Link, NavLink, useHistory} from "react-router-dom"
import React, {useState} from "react";
const LoggedInNav = () =>{
    const [error, setError] = useState("");
    const {logout } = useAuth();
    const history = useHistory();
    const [isSavedItemsOpen, setIsSavedItemsOpen] = useState(false);

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
        <Navbar collapseOnSelect bg="light" variant="light" expand="lg">
            <Container fluid>
                <Navbar.Brand  as={Link} to='/'>Recipe-Planner</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="responsive-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to='/mealplan'>MealPlan</Nav.Link>
                        <NavDropdown title='Saved Items' id='saved-items'
                                     onMouseEnter={() => setIsSavedItemsOpen(true)}
                                     onMouseLeave={() => setIsSavedItemsOpen(false)}
                                     show={isSavedItemsOpen}>
                            <NavDropdown.Item as={NavLink} to='/savedRecipes'>SavedRecipes</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to='/savedMeals'>SavedMeals</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
                <Nav className="justify-content-end">
                    <Button variant="light" onClick={(e)=>handleLogOut(e)}>
                        Log Out
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default LoggedInNav