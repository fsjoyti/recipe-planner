import React, {useState, useEffect, useCallback} from 'react';
import './Recipe.css'
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";
import {Alert, Button, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faThumbsUp,
    faStopwatch,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import {useMountedState} from "react-use";
import RecipeItem from "./RecipeItem";
import {useAuth} from "../../Contexts/AuthContext";
import {addRecipe} from "../Database/firestore";

const RecipeDetail = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMounted = useMountedState();
    const [error, setError] = useState('');
    const { currentUser } = useAuth();
    const history = useHistory();

    const getRecipeInformation = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {params: {apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY}});
            const {data} = await response;
            if (isMounted()) {
                console.log(data);
                setRecipe(data);
            }
        } catch (error) {
            if (isMounted()) {
                setError(error);
            }
        } finally {
            if (isMounted()) {
                setLoading(false);
            }
        }

    }, [id, isMounted]);

    const getSimilarRecipes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar`, {
                params: {
                    number: 4,
                    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY
                }
            });
            const {data} = await response;
            if (isMounted()) {
                setSimilarRecipes(data);
            }
        } catch (error) {
            if (isMounted()) {
                setError(error);
            }
        } finally {
            if (isMounted()) {
                setLoading(false);
            }
        }

    }, [id, isMounted]);

    useEffect(() => {
        getRecipeInformation();
    }, [getRecipeInformation]);

    useEffect(() => {
       getSimilarRecipes();
    }, [getSimilarRecipes]);

    const submitHandler = async (e) =>{
        try{
           await addRecipe(currentUser, recipe);
          history.push("/savedRecipes");
        }catch (e) {
            console.error(e);
            setError("Failed to save recipe ");
        }
    }

    return (
        <Container fluid className="d-flex justify-content-evenly recipe-detail">
            {
                loading ? (<Spinner animation="border" role="status"/>)
                    : (<div className="mx-auto">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div className="d-flex align-content-end flex-sm-nowrap fa-pull-right">
                            <div className="m-2 m-sm-1 m-lg-2 icon">
                                <FontAwesomeIcon icon={faThumbsUp}/>
                                <span data-descr="Recipe HealthScore">
                                {recipe.healthScore}
                             </span>
                            </div>
                            <div className="m-2 m-sm-1 m-lg-2 icon">
                                <FontAwesomeIcon icon={faUsers}/>
                                <span data-descr="Recipe Servings">
                                {recipe.servings}
                             </span>
                            </div>
                            <div className="m-2 m-sm-1 m-lg-2 icon">
                                <FontAwesomeIcon icon={faStopwatch}/>
                                <span data-descr="Recipe Ready In Minutes">{recipe.readyInMinutes}</span>
                            </div>
                        </div>
                        <h1 className="text-center header-color select-headers-style">{recipe.title}</h1>
                        <Row className="justify-content-md-center mt-2">
                            <Image src={recipe.image} alt={recipe.title} className="img-detail img-fluid"/>
                        </Row>
                        <p className="lead recipe-summary">{ReactHtmlParser(recipe.summary)}</p>
                        <h6 className="recipe-detail-color">Instructions for cooking:</h6>
                        <div className="recipe-instructions highlight">
                            {ReactHtmlParser(recipe.instructions)}
                        </div>
                       <div className="d-flex justify-content-center">
                           <Button id="save" disabled={loading} className="w-75 mealplan-button" variant="primary" type="submit" onClick={submitHandler}>
                               Save Recipe
                           </Button>
                       </div>
                    <div id ="similar-recipes">
                        <Row className="d-flex justify-content-md-between justify-content-xl-center">
                            {
                                similarRecipes.map((similarRecipe, index) => (
                                    <Col key={index} xs="12" sm="6" md="6" lg="6">
                                        <RecipeItem key={similarRecipe.id} recipe={similarRecipe}/>
                                    </Col>
                                ))

                            }
                        </Row>
                    </div>

                    </div>)
            }
        </Container>
    )
}

export default RecipeDetail;