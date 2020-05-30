import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { createBrowserHistory } from "history";

function LogIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [response, setResponse] = useState(null);
  const history = createBrowserHistory({ forceRefresh: true });

  function handleChange(id) {
    const element = document.getElementById(id);
    if (id === "login_email") {
      setEmail(element.value);
    } else if (id === "login_password") {
      setPassword(element.value);
    }
  }

  async function validate(event) {
    event.preventDefault();
    try {
      const data = await axios.get("/api/users/validation", {
        params: { email, password },
      });
      setResponse("logged in");
      const token = data.data.token;
      localStorage.setItem("jwtAuthToken", token);
      setTimeout(() => {
        history.push("/home");
      }, 1500);
    } catch (error) {
      setResponse(error.response.data);
    }
  }
  return (
    <div className={"background_images sign_up_login"}>
      <div className={"logo"}>
        <a href={"/home"}>NoteBook</a>
      </div>
      <Navbar nav_color={"#2b2b2b"} font_color={"aliceblue"} />
      <form
        onSubmit={(event) => validate(event)}
        style={{ height: "50%" }}
        className={"signUp_form"}
      >
        <h1>Log in!</h1>

        <input
          onChange={() => handleChange("login_email")}
          className={"signUp_login_inputs"}
          type={"text"}
          name={"mail"}
          placeholder={"Email"}
          id={"login_email"}
          autoComplete={"off"}
          required
          spellCheck={"false"}
        ></input>

        <input
          onChange={() => handleChange("login_password")}
          className={"signUp_login_inputs"}
          type={"password"}
          name={"password"}
          placeholder={"Password"}
          id={"login_password"}
          autoComplete={"off"}
          title={"Password must be atleast 8 characters long"}
          required
          spellCheck={"false"}
          maxLength={16}
        ></input>

        <input
          className={"signUp_login_inputs"}
          type={"submit"}
          value={"Login"}
        ></input>
        <div className={"signUp_no_user"}>
          no user? <a href={"/sign-up"}>click here!</a>
        </div>
        <h5 style={{ marginLeft: "5%" }}>{response}</h5>
      </form>
    </div>
  );
}

export default LogIn;
