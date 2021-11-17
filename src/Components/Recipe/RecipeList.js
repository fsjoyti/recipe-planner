import React from 'react';
import Recipe from "./Recipe";
import {Col, Container, Row} from "react-bootstrap";

const RecipeList = ({recipes})=>{
        return (  <Container fluid>
            <Row>
                {recipes.map((recipe, index) => (
                    <Col key={index} xs = "12" sm="6" md="4" lg="4">
                        <Recipe key={recipe.id} recipe={recipe}/>
                    </Col>
                ))}
            </Row>
        </Container>)
}

export default RecipeList;