import React, {useEffect, useState} from "react";
import {useAuth} from "../../Contexts/AuthContext";
import {db} from "../../firebase";
import {Alert, Button, Col, Container, Row, Spinner} from "react-bootstrap";
import './Mealplan.css'
import Meals from "./Meals";
import {deleteMeal, deleteRecipe} from "../Database/firestore";
import {useMountedState} from "react-use";

const SavedMeals = () => {
    const isMounted = useMountedState();
    const [savedMeals, setSavedMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {currentUser} = useAuth();

    const deleteDailyMeal = async (id) => {
        console.log(id)
        try {
            await deleteMeal(currentUser, id);
        } catch (error) {
            if (isMounted()) {
                if (isMounted()) {
                    setError(error);
                }
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = db.collection('users').doc(currentUser.uid).collection('meals').onSnapshot(
            (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    console.log(doc.id)
                    let documentData = doc.data()
                    documentData.id = doc.id
                    return documentData
                });
                console.log(data);
                setSavedMeals(data);
                setLoading(false);
            }, (error) => {
                console.log(error);
                setError(error);
            });
        return () => unsubscribe();
    }, [currentUser]);


    return (
        loading ? (<Spinner animation="border" role="status"/>) : (
            <Container fluid id="saved-meals" className="d-flex flex-wrap justify-content-center">
                {error && <Alert variant="danger">{error}</Alert>}
                <h1>Saved Meals</h1>
                <div>
                    <Row>
                        {savedMeals.map((savedMeal, index) => (
                            <Col key={index} xs="12" sm="12" md="12" lg="12">
                                <Meals mealData={savedMeal} isSavedMealScreen={true}/>
                                <Button id="save-meal" variant="danger" onClick={() => deleteDailyMeal(savedMeal.id)}>Delete
                                    this meal</Button>
                            </Col>
                        ))}
                    </Row>
                </div>

            </Container>)
    )

}

export default SavedMeals;