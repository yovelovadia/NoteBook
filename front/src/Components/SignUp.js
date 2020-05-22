import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [created, setCreated] = useState(false);
  const [existAccount, setExistAccount] = useState(false);

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

  function storeData(event) {
    setExistAccount(false);
    event.preventDefault();
    const user = { name: name, email: email, password: password };
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data))
      .then(() => setCreated(true))
      .catch((e) => setExistAccount(true));

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
          pattern={"[A-Za-z ]{2,}"}
          required
          title={"Must contain letters only"}
          spellCheck={"false"}
          maxLength={16}
        ></input>

        <input
          onChange={() => handleChange("register_email")}
          className={"signUp_login_inputs"}
          type={"email"}
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
          value={"Register"}
        ></input>
        {existAccount ? (
          <h2 style={{ marginLeft: "5%" }}>Account exists</h2>
        ) : created ? (
          <h2 style={{ marginLeft: "5%" }}>User created!</h2>
        ) : null}
      </form>
    </div>
  );
}

export default SignUp;
