import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { NavigationBar } from "./components/navbar/NavBar";
import { OnlinePage } from './pages/OnlinePage';
import { UserPage } from './pages/UserPage';


function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="App">
        <Routes>
          <Route
            path="/user/:user"
            element={<UserPage />}
          />
          <Route 
            exact path="/online"
            element={<OnlinePage />}
          />
          
        </Routes>
      </div>

    </Router>
  );
}

export default App;
