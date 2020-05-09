import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../type";
import * as Random from "expo-random";

export const setAlert = (msg, alertType, timeout = 3000) => async (
  dispatch
) => {
  const id = await Random.getRandomBytesAsync(16);
  console.log("id " + id);
  // const id = uuid.v1();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
