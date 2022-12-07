import { initialize } from '@stadline/react-mtcaptcha';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { NavigationBar } from "./components/navbar/NavBar";
import { AboutPage } from './pages/AboutPage';
import { GlobalStatPage } from './pages/GlobalStatPage';
import { OnlinePage } from './pages/OnlinePage';
import { RatingPage } from './pages/RatingPage';
import { UserPage } from './pages/UserPage';


function App() {

  useEffect(() => {
    initialize({
      sitekey: 'MTPublic-jjbWzoVd7',
      theme: 'neowhite',
      lang: 'en'
    })
  }, [])

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
          <Route exact path='/trends' element={<GlobalStatPage />} />
          <Route exact path='/about' element={<AboutPage />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
