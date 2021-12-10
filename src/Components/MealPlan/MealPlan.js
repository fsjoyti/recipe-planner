import React, {useState} from "react";
import {useMountedState} from "react-use";
import axios from "axios";
import {Alert, Button, Container, Form,  ListGroup} from "react-bootstrap";
import Meals from "./Meals";
import WeeklyMealPlan from "./WeeklyMealPlan";
import './Mealplan.css'
import sampledata from './mealdata.json'

const MealPlan = () => {

    const [diet, setDiet] = useState("");
    const [timeFrame, setTimeFrame] = useState("");
    const [targetCalories, setTargetCalories] = useState("");
    const [meals, setMeals] = useState(sampledata);
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

    const handleInputChange = (e) => {
        setIngredient(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setExcludedIngredients([...excludedIngredients, e.target.value]);
            setIngredient("");
        }
    }

    const deleteIngredient = (ingredient) => {
        const filteredIngredients = excludedIngredients.filter(item => item !== ingredient);
        setExcludedIngredients(filteredIngredients);
    }

    const fetchMealPlan = async () => {
        try {
            let options = {
                params: {
                    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY, timeFrame: timeFrame,
                    targetCalories: targetCalories, diet: diet, exclude: excludedIngredients.toString()
                }
            };
            setLoading(true);
            const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate`, options);
            const {data} = await response;
            if (isMounted()) {
                setTimeFrame("");
                setDiet("");
                setTargetCalories("");
                setIngredient("");
                setExcludedIngredients([]);
                if (timeFrame === "day") {
                    setWeeks(null);
                    setMeals(data);
                } else if (timeFrame === "week") {
                    setMeals(null);
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
        <Container fluid className="meal-plan d-flex flex-lg-column flex-xl-column flex-wrap flex-xl-nowrap justify-content-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <div>
                <h1 className="text-center header-color">Meal Planner</h1>
                <h3 className="text-muted muted-text-color">Get a weekly or daily meal plan based on your calories and diet</h3>
            </div>
            <div id="mealplan-select-div">
                <h4 className="select-headers-color select-headers-style">Select time frame</h4>
                <select value={timeFrame} className="form-select form-select-sm mb-3" onChange={handleTimeFrameChange}>
                    <option value="">Please select one</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                </select>
                <h4 className="select-headers-color select-headers-style">Select diet</h4>
                <select value={diet} className="form-select form-select-sm mb-3" onChange={handleDietChange}>
                    <option value="">Please select one</option>
                    <option value="none">No Diet</option>
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
                <h4 className="select-headers-color select-headers-style">Select total daily calories</h4>
                <select value={targetCalories} className="form-select form-select-sm mb-3"
                        onChange={handleTargetCaloriesChange}>
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
                <h4 className="select-headers-color select-headers-style">Enter excluded ingredients(optional)</h4>
                <Form.Control id="excluded" type="text" placeholder="Excluded ingredients" value={ingredient}
                              onChange={handleInputChange} aria-label="Excluded ingredients"
                              onKeyDown={handleKeyDown}/>
            </div>

            <Button className="w-50 mealplan-button" disabled={loading} variant="primary" type="submit" onClick={fetchMealPlan}>Get Meal
                Plan</Button>

            <div>
                <ListGroup as="ul">
                    {excludedIngredients.map((excludedIngredient, index) => (
                        <ListGroup.Item as="li" key={index}
                                        onClick={(e) => deleteIngredient(excludedIngredient)}>{excludedIngredient}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>

            <div className="meal-item spacing">
                {meals && <div>
                    <Meals mealData={meals}/>
                </div>
               }
            </div>
            {weeks && <WeeklyMealPlan week={weeks}/>}
        </Container>
    );

}

export default MealPlan;