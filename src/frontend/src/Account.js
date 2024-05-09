import React, { useState, useEffect } from 'react';
import SubmitRecipe from './SubmitRecipe';
import axios from 'axios';

function Account({ userId }) {
    // "home", "edit", "myRecipes", "submitRecipe"
    const [view, setView] = useState("home");
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usersRecipes, setUsersRecipes] = useState([]);

    const handleSubmitEdit = async () => {
        if (newPassword === confirmPassword) {
            const updateUser = {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            try {
            const response = await axios.post(
                "http://localhost:4000/api/users/change-password",
                updateUser
              );
            } catch (error) {
              console.error('Failed to update password:', error);
          }
        }
    }

    useEffect(() => {
      async function fetchRecipes() {
          try {
              const response = await axios.get('http://localhost:4000/api/recipes');
              const user = await axios.get(`http://localhost:4000/api/users/${userId}`);
              let recipes = [];
              console.log("fetch");
              console.log(user);
              console.log(user.userRecipes);
              response.data.forEach(function(recipe) {
                console.log(recipe.name);
                if (user.data.userRecipes && user.data.userRecipes.includes(recipe.name)) {
                  recipes.push(recipe);
                }
              });
              setUsersRecipes(recipes);
              console.log(recipes);
          } catch (error) {
              console.error('Failed to fetch recipes:', error);
          }
      }

      fetchRecipes();
  }, [userId]);

    let jsxComponent;
    switch(view) {
        case "home":
            jsxComponent = <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              minHeight: "60vh",
            }}
            >
              <button
                onClick={() => setView("edit")}
                style={{
                  width: "200px",
                  fontWeight: "bold",
                  borderRadius: 20,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >Edit Account</button> <br/> <br/>
              <button
                onClick={() => setView("myRecipes")}
                style={{
                  width: "200px",
                  fontWeight: "bold",
                  borderRadius: 20,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >My Recipes</button> <br/> <br/>
              <button
                onClick={() => setView("submitRecipes")}
                style={{
                  width: "200px",
                  fontWeight: "bold",
                  borderRadius: 20,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >Submit Recipes</button> 
            </div>
            break;
        case "edit":
            jsxComponent =
                <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: "60vh",
        }}
      >
        <form onSubmit={handleSubmitEdit}>
          <h2>Change Password</h2> <br />
          <input
            type="text"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
            placeholder="Old password..."
            required
          />
          <br /> <br />
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
            placeholder="New password..."
            required
          />
          <br /> <br />
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
            placeholder="Confirm password..."
            required
          />
          <br /> <br />
          <button
            type="submit"
            style={{
              width: "200px",
              fontWeight: "bold",
              borderRadius: 20,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Confirm
          </button>
        </form> <br/> <br/>
        <button
                onClick={() => setView("home")}
                style={{
                  width: "200px",
                  fontWeight: "bold",
                  borderRadius: 20,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >Back</button>
        </div>
            break;
        case "myRecipes":
          jsxComponent = <div>
            <div style={{ textAlign: 'center' }}>
              <h2 className="mb-4">Recipes</h2>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {usersRecipes.length > 0 ? (
                    usersRecipes.map(recipe => (
                        <div key={recipe._id} className="col">
                            <div className="card">
                                <div className="image-container" style={{ maxHeight: 400, maxWidth: 350, textAlign: "center" }}>
                                    <img src={recipe.imageUrl} className="card-img-top" alt={recipe.name} style={{ objectFit: "contain", maxHeight: 250, maxWidth: 250, height: "auto", width: "auto" }}/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.name}</h5>
                                    <p className="card-text">{recipe.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
            <div style={{ textAlign: 'center', position: 'absolute', left: "45%", bottom: "10%" }}>
            <button
                onClick={() => setView("home")}
                style={{
                  width: "200px",
                  fontWeight: "bold",
                  borderRadius: 20,
                  backgroundColor: "blue",
                  color: "white",
                  marginTop: "10px"
                }}
              >Back</button>
            </div>
          </div>
            break;
        case "submitRecipes":
            jsxComponent = <div>
                <SubmitRecipe userId={userId}/>
                <div style={{ textAlign: 'center', position: 'absolute', left: "45%", bottom: "10%" }}>
                <button
                onClick={() => setView("home")}
            style={{
              width: "200px",
              fontWeight: "bold",
              borderRadius: 20,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Back
          </button>
          </div>
                </div>
            break;
    }
    return (
        jsxComponent
    );
}

export default Account;
