import React from 'react';
import RecipeCard from "./RecipeCard";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import {deleteRecipe} from "../Database/firestore";

const RecipeLists = ({recipes, isavedRecipeScreen = false})=>{
    const {currentUser} = useAuth();

    const handleDelete = async (id)=>{
        try{
            await deleteRecipe(currentUser, id);
        }catch (error) {
            window.alert('Failed to delete '+ error.message);
        }
    }
        return (<Container fluid>
            <Row>
                {recipes.map((recipe, index) => (
                    <Col key={index} xs = "12" sm="6" md="4" lg="4">
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                        {isavedRecipeScreen && <Button variant="danger" key = {index} onClick={() => handleDelete(recipe.id)}>Delete</Button>}
                    </Col>
                ))}
            </Row>
        </Container>)
}

export default RecipeLists;