import React, {useEffect, useState} from "react";
import {useAuth} from "../../Contexts/AuthContext";
import {db} from "../../firebase";
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import './Mealplan.css'
import Meals from "./Meals";


const SavedMeals = () => {

    const [savedMeals, setSavedMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {currentUser} = useAuth();


    useEffect(() => {
        setLoading(true);
        const unsubscribe = db.collection('users').doc(currentUser.uid).collection('meals').onSnapshot(
            (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    let documentData = doc.data()
                    documentData.id = doc.id
                    return documentData
                });
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
                <h1 className="header-color text-center">Saved Meals</h1>
                <div>
                    <Row>
                        {savedMeals.map((savedMeal, index) => (
                            <Col key={index} xs="12" sm="12" md="12" lg="12">
                                <Meals mealData={savedMeal} isSavedMealScreen={true} id={savedMeal.id}/>

                            </Col>
                        ))}
                    </Row>
                </div>

            </Container>)
    )

}

export default SavedMeals;