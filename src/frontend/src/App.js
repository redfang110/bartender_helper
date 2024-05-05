import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Ingredients from './Ingredients';
import SubmitRecipe from './SubmitRecipe';
import Spirits from './Spirits';
import Mixers from './Mixers';
import Tools from './Tools';
import "./App.css"; // Ensure any custom styles don't conflict with Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
    const [recipes, setRecipes] = useState([]);

    return (
        <Router>
            <div className="container mt-4">
                <h1 className="text-center mb-3">Bartender Helper</h1>
                <nav className="mb-4">
                    <ul className="nav nav-pills justify-content-center">
                        <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/ingredients">Ingredients</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/submit-recipe">Submit Recipe</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/spirits">Spirits</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/mixers">Mixers</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/tools">Tools</NavLink></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/ingredients" element={<Ingredients setRecipes={setRecipes} recipes={recipes} />} />
                    <Route path="/submit-recipe" element={<SubmitRecipe />} />
                    <Route path="/spirits" element={<Spirits />} />
                    <Route path="/mixers" element={<Mixers />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return <div className="text-center"><h2>Welcome to the Bartender Helper App</h2></div>;
}

export default App;
