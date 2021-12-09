import {Button, Col, ListGroup, Row} from "react-bootstrap";
import RecipeItem from "../Recipe/RecipeItem";
import React from "react";
import {saveMeal} from "../Database/firestore";
import './Mealplan.css'
import {useAuth} from "../../Contexts/AuthContext";
import {useHistory} from 'react-router-dom';

const Meals = ({ mealData , isSavedMealScreen=false}) => {
    const {nutrients} = mealData;
    const {meals} = mealData;
    const {currentUser} = useAuth();
    const history = useHistory();

    const saveDailyMeal  = async ()=>{
        try{
            await saveMeal(currentUser, mealData);
            history.push("/savedMeals");
        }catch (error) {
            console.log(error);
        }
    }


    return (
        <section>
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
                {isSavedMealScreen === false &&  <Button id="save-meal" variant="secondary" onClick={saveDailyMeal}>Save this meal</Button>}
            </article>

        </section>
    )
}

export default Meals;