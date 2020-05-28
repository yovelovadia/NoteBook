import React, { useState, useEffect } from "react";
import Weather from "./WeatherWidget/Weather";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const [name, setName] = useState(null);
  const id = useSelector((state) => state.Logged.whoLogged);

  useEffect(() => {
    async function fetchName() {
      if (id) {
        const data = await axios.get(`http://localhost:5000/users/${id}`);
        await setName(data.data);
      }
    }
    fetchName();
  }, [id]);

  function logOut() {
    localStorage.removeItem("jwtAuthToken");
    setName(null);
  }

  return (
    <div className={"background_images home"}>
      <Navbar nav_color={"aliceblue"} font_color={"black"} />
      <Weather />
      <div className={"intro"}>
        {name ? <h2>Welcome {name}</h2> : null}

        <h1>NoteBook</h1>
        {name ? (
          <button onClick={logOut} className="log_out_button">
            Log-out
          </button>
        ) : (
          <div>
            <a className={"sign_up_button"} href={"/sign-up"}>
              Sign-up
            </a>
            <a className={"login_button"} href={"/log-in"}>
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
