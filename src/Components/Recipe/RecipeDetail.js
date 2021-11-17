import React, {useState, useEffect} from 'react';
import './Recipe.css'
import {useParams} from 'react-router-dom';
import axios from "axios";
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faThumbsUp,
    faStopwatch,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import {useMountedState} from "react-use";
import SimilarRecipe from "./SimilarRecipe";

const RecipeDetail = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMounted = useMountedState();
    useEffect(() => {
        setLoading(true);
        getRecipeInformation().then(response => {
            console.log(response);
            setRecipe(response)
            setLoading(false);
        }).catch(error => {
            console.log(error)
        });
    }, [id]);

    useEffect(()=>{
        setLoading(true);
        getSimilarRecipes().then(response=>{
            console.log(response);
            if(isMounted()){
                setSimilarRecipes(response);
            }
            setLoading(false);
        }).catch(error => {
            console.log(error)
        });

    },[id]);

    const getRecipeInformation = async () => {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {params: {apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY}});
        const {data} = await response;
        return data;
    }

    const getSimilarRecipes = async ()=>{
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar`, {params: {number:6, apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY}});
        const {data} = await response;
        return data;
    }

    return (
        <Container fluid className="d-flex justify-content-evenly recipe-detail">
            {
                loading ? (<Spinner animation="border" role="status"/>)
                    : (<div className="mx-auto">
                        <div className="d-flex align-content-end flex-sm-nowrap fa-pull-right">
                            <div className="m-2 m-sm-1">
                                <FontAwesomeIcon icon={faThumbsUp}/>
                                <span>
                                {recipe.healthScore}
                             </span>
                            </div>
                            <div className="m-2 m-sm-1">
                                <FontAwesomeIcon icon={faUsers}/>
                                <span>
                                {recipe.servings}
                             </span>
                            </div>
                            <div className="m-2 m-sm-1">
                                <FontAwesomeIcon icon={faStopwatch}/>
                                <span>{recipe.readyInMinutes}</span>
                            </div>
                        </div>
                        <h1 className="text-center">{recipe.title}</h1>
                        <Row className="justify-content-md-center mt-2">
                            <Col xs="12" sm="12" md="8" lg="8">
                                <Image src={recipe.image} alt={recipe.title} className="img-detail img-fluid"/>
                            </Col>
                        </Row>
                        <p className="lead recipe-summary">{ReactHtmlParser(recipe.summary)}</p>
                        <h6>Instructions for cooking:</h6>
                        <div className="recipe-instructions">
                            {ReactHtmlParser(recipe.instructions)}
                        </div>
                            {recipe.winePairing.pairingText &&(
                                <div className="wine-pairing">
                                    <h6>Wine pairing:</h6>
                                    <p>{recipe.winePairing.pairingText}</p>
                                </div>
                            )}
                        <h5>Similar Recipes</h5>
                        <Row className="d-flex justify-content-md-between">
                            {
                                similarRecipes.map((similarRecipe, index)=>(
                                    <Col key={index} xs = "12" sm="4" md="4" lg="4">
                                    <SimilarRecipe key = {similarRecipe.id} recipe={similarRecipe} />
                                    </Col>
                                ))

                            }
                        </Row>

                    </div>)
            }
        </Container>
    )
}

export default RecipeDetail;