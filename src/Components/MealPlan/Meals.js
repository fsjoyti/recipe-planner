import {Button, Col, ListGroup, Row} from "react-bootstrap";
import RecipeItem from "../Recipe/RecipeItem";
import React, {useState} from "react";
import {deleteMeal, saveMeal} from "../Database/firestore";
import './Mealplan.css'
import {useAuth} from "../../Contexts/AuthContext";
import {useHistory} from 'react-router-dom';
import {useMountedState} from "react-use";

const Meals = ({ mealData , isSavedMealScreen=false, id = null}) => {
    const {nutrients} = mealData;
    const {meals} = mealData;
    const {currentUser} = useAuth();
    const history = useHistory();
    const isMounted = useMountedState();
    const [error, setError] = useState('');

    const saveDailyMeal  = async ()=>{
        try{
            await saveMeal(currentUser, mealData);
            history.push("/savedMeals");
        }catch (error) {
            console.log(error);
        }
    }

    const deleteDailyMeal = async (id) => {
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


    return (
        <section className="spacing">
            <article>
                <ListGroup as="ul" className="list-group d-flex justify-content-md-between">
                    <ListGroup.Item as="li" className="list-group-item">Total
                        Calories: {nutrients.calories}</ListGroup.Item>
                    <ListGroup.Item as="li" className="list-group-item">Total
                        Proteins: {nutrients.protein}</ListGroup.Item>
                    <ListGroup.Item as="li" className="list-group-item">Total
                        Carbs: {nutrients.carbohydrates}</ListGroup.Item>
                    <ListGroup.Item as="li" className="list-group-item">Total
                        Fat: {nutrients.fat}</ListGroup.Item>
                </ListGroup>
                <Row className="d-flex justify-content-between">
                    {
                        meals.map((meal, index) => (
                            <Col key={index} xs="12" sm="4" md="4" lg="4">
                                <RecipeItem key={meal.id} recipe={meal}/>
                            </Col>
                        ))
                    }
                </Row>
                {isSavedMealScreen === false &&  <Button  className="mealplan-button save-meal" onClick={saveDailyMeal}>Save this meal</Button>}
                {isSavedMealScreen === true && id && <Button id="delete-meal" variant="danger" onClick={() => deleteDailyMeal(id)}>Delete
                    this meal</Button>}
            </article>

        </section>
    )
}

export default Meals;