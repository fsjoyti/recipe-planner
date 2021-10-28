import firebase from "./firebase";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Signup from "./Components/SignUp/SignUp"
import Login from './Components/Login/Login'

import Home from "./Components/Home/Home";
import {AuthProvider} from "./Contexts/AuthContext";
function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center Container-Height flex-fill" >
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
                  </Switch>
              </AuthProvider>
          </Router>
      </Container>
  );
}

export default App;
