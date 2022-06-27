import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { NavigationBar } from "./components/navbar/NavBar";
import { OnlinePage } from './pages/OnlinePage';
import { RatingPage } from './pages/RatingPage';
import { UserPage } from './pages/UserPage';


function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="App">
        <Routes>
          <Route exact path='/' element={<RatingPage />} />
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
