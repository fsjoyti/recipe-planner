import React from "react";
import {Card} from "react-bootstrap";
import './Recipe.css'
import StyledLink from "../StyledLink/StyledLink";
const RecipeCard = ({recipe})=> {
    const {title, readyInMinutes, image, id}  = recipe;

    return(
        <Card className="card m-lg-2">
            {image &&<Card.Img className="card-image-top" variant="top" src={image} alt={title}/>}
            <Card.Body>
                <Card.Title className="recipe-title">{title}</Card.Title>
                <Card.Subtitle className="mb-2 recipe-subtitle text-dark">Ready in minutes:{readyInMinutes} </Card.Subtitle>
                <StyledLink  to={`/recipe/${id}`}>Get Recipe Details</StyledLink>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;