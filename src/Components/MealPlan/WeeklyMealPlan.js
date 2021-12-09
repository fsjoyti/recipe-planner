import Meals from "./Meals";
import React from "react";

const WeeklyMealPlan = ({week})=>{

    const {monday, tuesday, wednesday,thursday, friday,saturday,sunday} = week;

    return(
        <div>
            {monday  &&
            (<div className="meal-item">
                <h4>Meal plan for Monday</h4>
                <Meals mealData={monday}/>
            </div>)}
            {tuesday &&
            (
                <div className="meal-item">
                    <h4>Meal plan for Tuesday</h4>
                    <Meals mealData={tuesday}/>
                </div>
            )}
            {wednesday && (
                <div className="meal-item">
                    <h4>Meal plan for Wednesday</h4>
                    <Meals mealData={wednesday}/>
                </div>
            )}
            {thursday &&
                <div className="meal-item">
                    <h4>Meal plan for Thursday</h4>
                    <Meals mealData={thursday}/>
                </div>
          }
            {friday &&
            (<div className="meal-item">
                <h4>Meal plan for Friday</h4>
                <Meals mealData={friday}/>
            </div>)
           }
            {saturday &&
            (<div className="meal-item">
                <h4>Meal plan for Saturday</h4>
                <Meals mealData={saturday}/>
            </div>)
            }
            {sunday && (
                <div className="meal-item">
                <h4>Meal Plan for Sunday</h4>
                <Meals mealData={sunday}/>
            </div>)
            }
        </div>
    );
}

export default WeeklyMealPlan;