import React from "react";
import {Card} from "react-bootstrap";
import './Recipe.css'
import StyledLink from "../StyledLink/StyledLink";
const Recipe = ({recipe})=> {
    const {title, readyInMinutes, image, id}  = recipe;

    return(
        <Card className="card mt-1 mb-1">
            {image &&<Card.Img className="card-image-top" variant="top" src={image} alt={recipe.title}/>}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-dark">Ready in minutes:{readyInMinutes} </Card.Subtitle>
                <StyledLink to={`/recipe/${id}`}>Get Recipe Details</StyledLink>
            </Card.Body>
        </Card>
    )
}

export default Recipe;