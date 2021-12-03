import React, {useState, useEffect} from "react";
import {useAuth} from "../../Contexts/AuthContext";

import {Alert, Card, Col, ListGroup, Row, Spinner} from "react-bootstrap";

import RecipeLists from "./RecipeLists";
import {db} from "../../firebase";

const SavedRecipes = ()=>{
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {currentUser} = useAuth();

    useEffect(()=>{
        setLoading(true);
     const unsubscribe= db.collection('users').doc(currentUser.uid).collection('recipes').onSnapshot(
           (snapshot)=>{
               const data = snapshot.docs.map(doc => doc.data());
               setSavedRecipes(data);
               setLoading(false);
           }, (error)=>{
               setError(error);
         });
        return () => unsubscribe();
    },[currentUser]);

 return(
     loading? (<Spinner animation="border" role="status"/>): (
         <div>
             {error && <Alert variant="danger">{error}</Alert>}
             <h1 className="text-center">Saved Recipes</h1>
             <RecipeLists recipes={savedRecipes} isavedRecipeScreen={true}/>
         </div>

     )
 )
}

export default SavedRecipes;