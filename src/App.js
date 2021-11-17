import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {AuthProvider} from "./Contexts/AuthContext";
import Signup from "./Components/SignUp/SignUp"
import Login from './Components/Login/Login'
import Home from "./Components/Home/Home";
import RecipeDetail from "./Components/Recipe/RecipeDetail";
function App() {
  return (
      <Container fluid className="Container-Height" >
          <Router>
              <AuthProvider>
                  <Switch>
                     <Route exact path = "/">
                         <Home/>
                     </Route>
                      <Route path="/signup">
                          <Signup/>
                      </Route>
                      <Route path="/login">
                          <Login/>
                      </Route>
                      <Route path = "/recipe/:id">
                          <RecipeDetail/>
                      </Route>
                  </Switch>
              </AuthProvider>
          </Router>
      </Container>
  );
}

export default App;
