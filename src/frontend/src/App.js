import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Ingredients from './Ingredients';
import SubmitRecipe from './SubmitRecipe';
import Spirits from './Spirits';
import Mixers from './Mixers';
import Tools from './Tools';
import AboutView from './AboutView'; // Ensure this path is correct
import ShowRecipes from './ShowRecipes';
import Login from './Login';
import Account from './Account';

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function App() {
    const [userId, setUserId] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const headerStyle = {
        backgroundColor: 'blue', // Set the background color to black
        color: 'white', // Set the font color to white
        padding: '10px 0', // Add some padding to increase the size of the header area
        marginBottom: '20px' // Add margin below the header
    };

    const handleIdChange = (id) => {
        setUserId(id);
    }

    const handleLogIn = () => {
        setLoggedIn(true);
    }
 
    return (
        loggedIn ? <LoggedIn id={userId}/> : <Login userIdVal={handleIdChange} loggedIn={handleLogIn}/>
    );
}

function LoggedIn({ id }) {
    const [recipes, setRecipes] = useState([]);
    return (
        <Router>
            <div className="container mt-5">
            <h1 className="text-center bg-primary text-white py-2 mb-4">Bartender Helper</h1>
                <nav className="mb-3">
                    <ul className="nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/" exact>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/account" exact>Account</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/recipes">Recipes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/spirits">Spirits</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/mixers">Mixers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/tools">Tools</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/ingredients">Ingredients</NavLink>
                        </li> */}
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/submit-recipe">Submit Recipe</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    {/* <Route path="/ingredients" element={<Ingredients setRecipes={setRecipes} recipes={recipes} />} /> */}
                    {/* <Route path="/submit-recipe" element={<SubmitRecipe />} /> */}
                    <Route path="/spirits" element={<Spirits userId={id}/>} />
                    <Route path="/mixers" element={<Mixers userId={id}/>} />
                    <Route path="/tools" element={<Tools userId={id}/>} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutView />} />
                    <Route path="/recipes" element={<ShowRecipes userId={id}/>}/>
                    <Route path="/account" element={<Account userId={id}/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div className="container text-center">
            <h2>Welcome to the Bartender Helper App</h2>
            <div className="card">
                <div className="card-body">
                    <p>Bartender Helper is your go-to resource for creating delicious cocktails right at home.</p>
                    <p>With Bartender Helper, you can:</p>
                    <ul className="list-unstyled">
                        <li>- Explore a wide range of cocktail recipes.</li>
                        <li>- Find ingredients for your favorite cocktails.</li>
                        <li>- Submit your own recipes to share with the community.</li>
                        <li>- Learn about different spirits, mixers, and tools used in cocktail making.</li>
                    </ul>
                    <p>Get started by exploring the navigation menu above!</p>
                </div>
            </div>
        </div>
    );
}

export default App;
