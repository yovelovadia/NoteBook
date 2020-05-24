import axios from "axios";

function useAuthToken(token) {
  // const dispatch = useDispatch();
  if (!token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default useAuthToken;
