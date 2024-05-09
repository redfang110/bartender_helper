import React, { useState } from 'react';
import SubmitRecipe from './SubmitRecipe';
import axios from 'axios';

function Account({ userId }) {
    // "home", "edit", "myRecipes", "submitRecipe"
    const [view, setView] = useState("home");
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmitEdit = async () => {
        if (newPassword === confirmPassword) {
            const updateUser = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            const response = await axios.post(
                "http://localhost:4000/api/users/change-password",
                updateUser
              );
        }
    }

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
            break;
        case "submitRecipes":
            jsxComponent = <div>
                <SubmitRecipe userId={userId}/>
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
            break;
    }
    return (
        jsxComponent
    );
}

export default Account;
