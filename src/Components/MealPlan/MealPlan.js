import React, {useState} from "react";
import {useMountedState} from "react-use";
import axios from "axios";
import {Button, Col, Container, Form, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import Meals from "../Recipe/Meals";
import WeeklyRecipes from "../Recipe/WeeklyRecipes";
import RecipeCard from "../Recipe/RecipeCard";

const MealPlan = () => {
    const [diet, setDiet] = useState("");
    const [timeFrame, setTimeFrame] = useState("");
    const [targetCalories, setTargetCalories] = useState("");
    const [meals, setMeals] = useState(null);
    const [weeks, setWeeks] = useState(null);
    const [excludedIngredients, setExcludedIngredients] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [loading, setLoading] = useState(false);
    const isMounted = useMountedState();
    const [error, setError] = useState('');

    const handleTimeFrameChange = (e) => {
        setTimeFrame(e.target.value);
    }

    const handleDietChange = (e) => {
        setDiet(e.target.value);
    }

    const handleTargetCaloriesChange = (e) => {
        setTargetCalories(e.target.value);
    }

    const handleInputChange = (e)=>{
        setIngredient(e.target.value);
    }

    const handleKeyDown = (e)=>{
        if(e.key === 'Enter'){
            setExcludedIngredients([...excludedIngredients, e.target.value]);
            setIngredient("");
        }
    }

    const deleteIngredient = (ingredient)=>{
        const filteredIngredients = excludedIngredients.filter(item => item !== ingredient);
        setExcludedIngredients(filteredIngredients);
    }

    const fetchMealPlan = async () => {
        try {
            let options = {
                params: {
                    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY, timeFrame: timeFrame,
                    targetCalories: targetCalories, diet: diet, exclude:excludedIngredients
                }
            };
            setLoading(true);
            const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate`, options);
            const {data} = await response;
            console.log(data);
            if (isMounted()) {
                setTimeFrame("");
                setDiet("");
                setTargetCalories("");
                setExcludedIngredients("");
                if(timeFrame === "day"){
                    setMeals(data);
                }
                else if(timeFrame === "week"){
                    setWeeks(data.week);
                }
            }
        } catch (error) {
            console.log(error);
            if (isMounted()) {
                setError(error);
            }
        } finally {
            if (isMounted()) {
                setLoading(false);
            }
        }

    };

    return (
        <Container className="meal-plan">
            <h1 className="text-center">Meal Planner</h1>
            <h3 className="text-muted">Get a weekly or daily meal plan based on your calories and diet</h3>
            <h4>Select time frame</h4>
            <select value={timeFrame} className="form-select form-select-sm mb-3" onChange={handleTimeFrameChange}>
                <option value="">Please select one</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
            </select>
            <h4>Select diet</h4>
            <select value={diet} className="form-select form-select-sm mb-3" onChange={handleDietChange}>
                <option value="">Please select one</option>
                <option value="">No Diet</option>
                <option value="lacto-vegetarian">Lacto Vegetarian</option>
                <option value="ovo-vegetarian">Ovo Vegetarian</option>
                <option value="paleo">Paleo</option>
                <option value="primal">Primal</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="whole30">Whole 30</option>
            </select>
            <h4>Select total daily calories</h4>
            <select value={targetCalories} className="form-select form-select-sm mb-3" onChange={handleTargetCaloriesChange}>
                <option value="">Please select one</option>
                <option value="1400">1400</option>
                <option value="1600">1600</option>
                <option value="1800">1800</option>
                <option value="2000">2000</option>
                <option value="2200">2200</option>
                <option value="2400">2400</option>
                <option value="2600">2600</option>
                <option value="2800">2800</option>
                <option value="2800">3000</option>
                <option value="3200">3200</option>
            </select>
            <Form.Control id="excluded"  type="text" placeholder = "Excluded ingredients" value={ingredient} onChange={handleInputChange} aria-label= "Excluded ingredients"
                          onKeyDown={handleKeyDown} />
            <br/>

            <div>
                <ListGroup as="ul" className="mb-3">
                    {excludedIngredients.map((excludedIngredient, index) => (
                        <ListGroup.Item as="li" key={index} onClick={(e)=> deleteIngredient(excludedIngredient)}>{excludedIngredient}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className="d-flex justify-content-center">
                <Button className="w-75" variant="primary" type="submit" onClick={fetchMealPlan}>Get Meal
                    Plan</Button>
            </div>
            <div className="meal-item">
                {meals && <Meals mealData={meals}/>}
            </div>
            {weeks && <WeeklyRecipes week={weeks}/>}

        </Container>
    );

}

export default MealPlan;