
import React, {useState, useEffect} from 'react';

import axios from "axios";
import {useMountedState} from "react-use";
import {Spinner} from "react-bootstrap";
import Recipe from "./Recipe";

const SimilarRecipe =({recipe})=>{

    const [loading, setLoading] = useState(false);
    const [similarRecipe,setSimilarRecipe]=useState({});
    const isMounted = useMountedState();

    useEffect(()=>{
        getRecipeInformation(recipe['id']).then(response=>{
            console.log(response);
           if(isMounted()) {
               setSimilarRecipe(response);
           }
        }).catch(error=>{
            console.log(error);
        });

    },[]);

    const getRecipeInformation = async (id) => {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {params: {apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY}});
        const {data} = await response;
        return data;
    }

    return(
        loading ? (<Spinner animation="border" role="status"/>): (<Recipe recipe={similarRecipe}/>)
    )

}

export default SimilarRecipe;