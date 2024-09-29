import React, { useState } from "react";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State to manage form type
  const [error, setError] = useState<string | null>(null); // Error state

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestData: any = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // Add username and bio only for sign-up
    if (isSignUp) {
      requestData.username = data.get("username");
      requestData.bio = data.get("bio") || null; // Bio is optional
    }

    const endpoint = isSignUp ? "http://localhost:8081/api/user/register" : "http://localhost:8081/api/user/login";  

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      console.log("Response", response);
      if (!response.ok) {
        const message = `Error: ${response.statusText}`;
        throw new Error(message);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Handle success (e.g., redirect, store token, etc.)
      if (isSignUp) {
        alert("Account created successfully!");
      } else {
        alert("Signed in successfully!");
        // Optionally store user token or details in local storage
      }

    } catch (error) {
      setError("Failed to submit form. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>} {/* Display error message */}

      {/* Sign Up Form */}
      <div className={`${styles.formContainer} ${isSignUp ? styles.rightPanelActive : ""}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Create Account</h1>
          {isSignUp && (
            <>
              <input
                className={styles.input}
                name="username"
                type="text"
                placeholder="Username"
                required
              />
              <input
                className={styles.input}
                name="bio"
                type="text"
                placeholder="Bio (optional)"
              />
            </>
          )}
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button className={styles.button} type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          {isSignUp && (
            <p className={styles.text}>
              Already have an account?{" "}
              <span className={styles.forgot} onClick={handleSignInClick}>
                Sign In
              </span>
            </p>
          )}
        </form>
      </div>

      {/* Sign In Section */}
      <div className={`${styles.overlayContainer} ${isSignUp ? styles.rightPanelActive : ""}`}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.description}>
            To keep connected with us please login with your personal info
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            {!isSignUp && (
              <>
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  className={styles.input}
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </>
            )}
            <button className={styles.button} type="submit">
              Sign In
            </button>
            <p className={styles.text}>
              Don't have an account?{" "}
              <span className={styles.forgot} onClick={handleSignUpClick}>
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
