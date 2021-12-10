import React, {useState} from 'react';
import RecipeCard from "./RecipeCard";
import {Alert, Button, Col, Row} from "react-bootstrap";
import {useAuth} from "../../Contexts/AuthContext";
import {deleteRecipe} from "../Database/firestore";
import {useMountedState} from "react-use";

const RecipeLists = ({recipes, isavedRecipeScreen = false})=>{
    const {currentUser} = useAuth();
    const isMounted = useMountedState();
    const [error, setError] = useState('');

    const handleDelete = async (id)=>{
        try{
            await deleteRecipe(currentUser, id);
        }catch (error) {
            if(isMounted()){
                if (isMounted()) {
                    setError(error);
                }
            }
        }
    }
        return (<div id="recipe-list">
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {recipes.map((recipe, index) => (
                    <Col key={index} xs = "12" sm="6" md="6" lg="4" xl="4">
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                        {isavedRecipeScreen && <Button variant="danger" key = {index} onClick={() => handleDelete(recipe.id)}>Delete</Button>}
                    </Col>
                ))}
            </Row>
        </div>)
}

export default RecipeLists;