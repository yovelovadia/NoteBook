const Logged = (state = {}, action) => {
  switch (action.type) {
    default:
      state = { whoLogged: null };

      break;

    case "Logged":
      state = { whoLogged: action.value };
      break;
  }
  return state;
};
export default Logged;
