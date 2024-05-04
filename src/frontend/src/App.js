import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Ingredients from './Ingredients';
import SubmitRecipe from './SubmitRecipe';
import Spirits from './Spirits';
import Mixers from './Mixers';
import Tools from './Tools';

function App() {
    const [recipes, setRecipes] = useState([]);

    return (
        <Router>
            <div>
                <h1>Bartender Helper</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/ingredients">Ingredients</Link></li>
                        <li><Link to="/submit-recipe">Submit Recipe</Link></li>
                        <li><Link to="/spirits">Spirits</Link></li>
                        <li><Link to="/mixers">Mixers</Link></li>
                        <li><Link to="/tools">Tools</Link></li>
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
    return <h2>Welcome to the Bartender Helper App</h2>;
}

export default App;
