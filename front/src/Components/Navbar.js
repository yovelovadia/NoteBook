import React from "react";

function Navbar(props) {
  function nav_active() {
    const nav = document.querySelector(".nav");
    const listLinks = document.querySelectorAll(".links li");
    const burger = document.querySelectorAll(".burger div");
    burger.forEach((div) => {
      div.classList.toggle(".burger-active");
    });
    nav.classList.toggle("nav-active");
    if (nav.className === "nav nav-active") {
      listLinks.forEach((link, index) => {
        link.style.animation = `moving_links 0.5 ease forwards ${
          (index + 0.1) * 0.5
        }s `;
      });
    } else {
      listLinks.forEach((link) => {
        link.style.animation = "back_links 0.5 ease forwards";
      });
    }
  }
  return (
    <React.Fragment>
      <nav>
        <div style={{ color: props.nav_color }} className={"nav"}></div>
        <ul style={{ color: props.font_color }} className={"links"}>
          <li>
            <a
              style={{ color: props.font_color }}
              className={"links_href"}
              href={"/notes"}
            >
              Notes
            </a>
          </li>
          <li>
            <a
              style={{ color: props.font_color, left: "3vw" }}
              className={"links_href"}
              href={"/schedule"}
            >
              Schedule
            </a>
          </li>
          <li>
            <a
              style={{ color: props.font_color, left: "6vw" }}
              className={"links_href"}
              // href={"/schedule"}
            >
              inProgress
            </a>
          </li>
          <li>
            <a
              style={{ color: props.font_color, left: "9vw" }}
              className={"links_href"}
              // href={"/schedule"}
            >
              inProgress
            </a>
          </li>
        </ul>
      </nav>
      <div onClick={nav_active} className={"burger"}>
        <button id={"burger_button"} />
        <div style={{ backgroundColor: props.burger_color }}></div>
        <div style={{ backgroundColor: props.burger_color }}></div>
        <div style={{ backgroundColor: props.burger_color }}></div>
      </div>
    </React.Fragment>
  );
}
export default Navbar;
