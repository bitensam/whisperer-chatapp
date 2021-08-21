import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Context to jesden duzy obiekt ktory zawiera wszystkie dane, w tym przypadku dane uzytkownika
//i zawiera wszystkie inne komponenty. Nasz context zarządza całym stanem aplikacji.
import { AuthProvider } from "../contexts/AuthContext"
import Chats from '../components/Chats/Chats'
import Login from "./Login/Login";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
