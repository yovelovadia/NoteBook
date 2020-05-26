import axios from "axios";

function useAuthToken(token) {
  if (!token) {
    axios.defaults.headers["authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["authorization"];
  }
}

export default useAuthToken;
