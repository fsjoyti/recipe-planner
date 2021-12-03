import {Col, ListGroup, Row} from "react-bootstrap";
import RecipeItem from "./RecipeItem";
import React from "react";

const Meals = ({ mealData}) => {
    const {nutrients} = mealData;
    const {meals} = mealData;

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
            </article>
            <Row className="d-flex justify-content-md-between">
                {
                    meals.map((meal, index) => (
                        <Col key={index} xs="12" sm="4" md="4" lg="4">
                            <RecipeItem key={meal.id} recipe={meal}/>
                        </Col>
                    ))

                }
            </Row>
        </section>
    )
}

export default Meals;