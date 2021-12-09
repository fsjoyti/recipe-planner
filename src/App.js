import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {AuthProvider} from "./Contexts/AuthContext";
import Signup from "./Components/SignUp/SignUp"
import Login from './Components/Login/Login'
import Home from "./Components/Home/Home";
import RecipeDetail from "./Components/Recipe/RecipeDetail";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import MealPlan from "./Components/MealPlan/MealPlan";
import React from "react";
import SavedRecipes from "./Components/Recipe/SavedRecipes";
import SavedMeals from "./Components/MealPlan/SavedMeals";

function App() {
  return (
      <Container fluid>
          <Router>
              <AuthProvider>
                  <Switch>
                      <PrivateRoute exact path = "/" component={Home}/>
                      <PrivateRoute path = "/recipe/:id" component={RecipeDetail} />
                      <PrivateRoute path = "/mealplan" component={MealPlan} />
                      <PrivateRoute path = "/savedRecipes" component={SavedRecipes}/>
                      <PrivateRoute path = "/savedMeals" component={SavedMeals}/>
                      <Route path = "/signup" component={Signup} />
                      <Route path = "/login" component = {Login}/>
                  </Switch>
              </AuthProvider>
          </Router>
      </Container>
  );
}

export default App;
