import axios from "axios";

function checkJwtExp() {
  function forbidden(err) {
    if (err.response.data === "Forbidden") {
      localStorage.removeItem("jwtAuthToken");
      return "relog";
    }
  }

  const token = `bearer ${localStorage.getItem("jwtAuthToken")}`;
  axios
    .get("http://localhost:5000/users/check-jwt-exp", {
      params: { token },
    })
    .then((res) => {
      return "logged";
    })
    .catch((err) => forbidden(err));
}

export default checkJwtExp;
