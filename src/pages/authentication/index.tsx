import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styles from "./authentication.module.css";

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUpClick = () => setIsSignUp(true);
  const handleSignInClick = () => setIsSignUp(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const requestData: any = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (isSignUp) {
      requestData.username = data.get("username");
      requestData.bio = data.get("bio") || null;
    }

    const tenantId = "INST_GR"

    if (!tenantId) {
      setError("Tenant ID is required.");
      return;
    }

    const endpoint = isSignUp
      ? "http://localhost:8081/api/user/register"
      : "http://localhost:8081/api/user/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Id": tenantId,  
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const message = `Error: ${response.statusText}`;
        throw new Error(message);
      }

      const result = await response.json();

      // Store user info in localStorage for Email/Password Authentication
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: result.id,
          username: result.username,
          email: result.email,
          token: result.jwtToken,
          profilePicture: result.profilePicture,
          bio: result.bio,
        })
      );
      localStorage.setItem("jwtToken", result.jwtToken);

      // Redirect to Home Page
      router.push("/home");
    } catch (error) {
      setError("Failed to submit form. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleSignInResponse = await signIn("google", { redirect: false });
      console.log("googleSignInResponse", googleSignInResponse);
      if (googleSignInResponse?.error) {
        throw new Error("Google sign-in failed.");
      }
      router.push("/home");
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}

      <div
        className={`${styles.formContainer} ${
          isSignUp ? styles.rightPanelActive : ""
        }`}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>
            {isSignUp ? "Create Account" : "Sign In"}
          </h1>
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

      <div
        className={`${styles.overlayContainer} ${
          isSignUp ? styles.rightPanelActive : ""
        }`}
      >
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

          {/* Google Sign-In Button */}
          <button className={styles.button} onClick={handleGoogleSignIn}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
