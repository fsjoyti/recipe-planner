import "./Home.css"
import breakfast from '../../assets/images/breakfast.png'
import lunch from '../../assets/images/lunch.png'
import dinner from '../../assets/images/dinner.png'
import axios from 'axios';
import React, {useState, useEffect, useCallback} from "react";
import Mealtime from "../Mealtime/Mealtime";
import Search from "../Search/Search";
import RecipeLists from "../Recipe/RecipeLists";
import {useMountedState} from 'react-use';
import {useAuth} from "../../Contexts/AuthContext";
import {Alert, Spinner} from "react-bootstrap";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const {currentUser} = useAuth()
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("American Vegan");
    const isMounted = useMountedState();
    const [error, setError] = useState('');

    const getRecipes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
                params: {
                    number: 6,
                    query: query,
                    addRecipeInformation: true,
                    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY
                }
            })
            const {data} = await response;
            const {results} = data;
            if (isMounted()) {
                setRecipes(results);
            }
        } catch (error) {
            if (isMounted()) {
                setError(error);
            }
        }finally {
            if (isMounted()) {
                setLoading(false);
            }
        }

    }, [query, isMounted]);

    useEffect(() => {
        getRecipes();
    }, [getRecipes]);

    const search = searchValue => {
        if (isMounted()) {
            setQuery(searchValue);
        }
    }

    const mealTime = [
        {id: 1, icon: breakfast, alt: 'breakfast plate', title: 'breakfast'},
        {id: 2, icon: lunch, alt: 'burger', title: 'lunch'},
        {id: 3, icon: dinner, alt: 'turkey', title: 'dinner'},
    ]

    return loading ? (<Spinner animation="border" role="status"/>):(
        <div className="home">
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <div className="mealtime">
                {mealTime.map(data =>
                    <Mealtime key={data.id} img={data.icon} alt={data.alt} title={data.title}/>
                )}
            </div>
            <Search search={search}/>
            <RecipeLists recipes={recipes}/>
        </div>
    )
}

export default Home