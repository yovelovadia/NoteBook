import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function LogIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [wrongPass, setWrongPass] = useState(false);
  const [existEmail, setExistEmail] = useState(false);

  function handleChange(id) {
    const element = document.getElementById(id);
    if (id === "login_email") {
      setEmail(element.value);
    } else if (id === "login_password") {
      setPassword(element.value);
    }
  }

  function checkDataGiven(data) {
    setExistEmail(false);
    if (data.data.length === 0) {
      setExistEmail(true);
    } else if (data.data[0].password === password) {
      console.log("Logged in");
    } else {
      setWrongPass(true);
    }
  }

  function validate(event) {
    event.preventDefault();
    axios
      .get("http://localhost:5000/users/validation", {
        params: { email: email },
      })
      .then((data) => checkDataGiven(data));
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
          type={"email"}
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
          type={"text"}
          name={"password"}
          placeholder={"Password"}
          id={"login_password"}
          pattern={"[A-Za-z0-9]{8,}"}
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
        {existEmail ? (
          <h2 style={{ marginLeft: "5%" }}>Invalid email</h2>
        ) : wrongPass ? (
          <h2 style={{ marginLeft: "5%" }}>Invalid password</h2>
        ) : null}
      </form>
    </div>
  );
}

export default LogIn;
