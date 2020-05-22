import React from "react";
import Weather from "./WeatherWidget/Weather";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className={"background_images home"}>
      <Navbar nav_color={"aliceblue"} font_color={"black"} />
      <Weather />
      <div className={"intro"}>
        <h1>NoteBook</h1>
        <a className={"sign_up_button"} href={"/sign-up"}>
          Sign-up
        </a>

        <a className={"login_button"} href={"/log-in"}>
          Login
        </a>
      </div>
    </div>
  );
}

export default Home;
