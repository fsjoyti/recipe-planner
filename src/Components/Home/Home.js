import "./Home.css"
import breakfast from '../../assets/images/breakfast.png'
import lunch from '../../assets/images/lunch.png'
import dinner from '../../assets/images/dinner.png'
import axios from 'axios'
import React, {useState, useEffect} from "react";
import LoggedInNav from "../LoggedInNav/LoggedInNav";
import Mealtime from "../Mealtime/Mealtime";
import Search from "../Search/Search";
import RecipeList from "../Recipe/RecipeList";
import {useMountedState} from 'react-use';
const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("American");
    const isMounted = useMountedState();
    useEffect(() => {
        const getRecipes = async () => {
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
            return results;
        }

        getRecipes().then(response => {
                if (isMounted) {
                    setRecipes(response)
                }
            }
        ).catch(error => {
            console.log(error)
        });

    }, [query, isMounted]);

    const search = searchValue => {
        setQuery(searchValue);
    }

    const mealTime = [
        {id: 1, icon: breakfast, alt: 'breakfast plate', title: 'breakfast'},
        {id: 2, icon: lunch, alt: 'burger', title: 'lunch'},
        {id: 3, icon: dinner, alt: 'turkey', title: 'dinner'},
    ]

    return (
        <div className="home">
            <LoggedInNav/>
            <div className="mealtime">
                {mealTime.map(data =>
                    <Mealtime key={data.id} img={data.icon} alt={data.alt} title={data.title}/>
                )}
            </div>
            <Search search={search}/>
            <RecipeList recipes={recipes}/>
        </div>
    )
}

export default Home