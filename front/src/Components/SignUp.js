import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [response, setResponse] = useState(null);
  const history = useHistory();

  function handleChange(id) {
    const element = document.getElementById(id);
    if (id === "register_fname") {
      setName(element.value);
    } else if (id === "register_email") {
      setEmail(element.value);
    } else if (id === "register_password") {
      setPassword(element.value);
    }
  }

  async function storeData(event) {
    event.preventDefault();
    const user = { name, email, password };
    try {
      await axios.post("http://localhost:5000/users/add", user);
      await setResponse("User Created");
      setTimeout(() => {
        history.push("/log-in");
      }, 1500);
    } catch (error) {
      setResponse(error.response.data);
    }

    return false;
  }

  return (
    <div className={"background_images sign_up_login"}>
      <div className={"logo"}>
        <a href={"/home"}>NoteBook</a>
      </div>
      <Navbar nav_color={"#2b2b2b"} font_color={"aliceblue"} />
      <form onSubmit={(event) => storeData(event)} className={"signUp_form"}>
        <h1>Sign-Up!</h1>
        <input
          onChange={() => handleChange("register_fname")}
          className={"signUp_login_inputs"}
          type={"text"}
          name={"fname"}
          placeholder={"Name"}
          id={"register_fname"}
          autoComplete={"off"}
          required
          title={"Must contain letters only and min 2 characters"}
          spellCheck={"false"}
          maxLength={16}
        ></input>

        <input
          onChange={() => handleChange("register_email")}
          className={"signUp_login_inputs"}
          type={"text"}
          name={"mail"}
          placeholder={"Email"}
          id={"register_email"}
          autoComplete={"off"}
          required
          title={"Email is not valid"}
          spellCheck={"false"}
        ></input>

        <input
          onChange={() => handleChange("register_password")}
          className={"signUp_login_inputs"}
          type={"text"}
          name={"password"}
          placeholder={"Password"}
          id={"register_password"}
          autoComplete={"off"}
          title={"Password must be atleast 8 characters long"}
          required
          spellCheck={"false"}
          maxLength={16}
        ></input>

        <input
          className={"signUp_login_inputs"}
          type={"submit"}
          value={"Register"}
        ></input>
        <h5 style={{ marginLeft: "5%" }}>{response}</h5>
      </form>
    </div>
  );
}

export default SignUp;
