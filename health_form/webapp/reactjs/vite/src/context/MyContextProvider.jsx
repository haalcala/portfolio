import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const MyContext = createContext(null)

console.log("MyContext:", MyContext)

export function MyContextProvider({ children }) {
  const [state, setState] = useState({
    name: "",
    temperature: 35
  })

  function setName(name) {
    setState({ ...state, name })
  }

  function setTemperature(temperature) {
    setState({ ...state, temperature })
  }

  function setSymptomatic(symptomatic) {
    setState({ ...state, symptomatic })
  }

  function setInContact(in_contact) {
    setState({ ...state, in_contact })
  }

  function validateData() {
    return state.name && state.temperature >= 20 && state.temperature <= 100
  }

  async function submitData() {
    const { name, temperature, symptomatic, in_contact } = state

    const resp = await axios.post(
      "/api/v1/user_temp",
      { name, temperature, symptomatic, in_contact }
    )

    console.log("resp:", resp)

    if (resp.status == 200) {
      setState({...state, response_status: "success"})
    }
    else {
      setState({...state, response_status: "error", response_msg: resp.error_message || "Unknown error"})
    }
  }

  return (
    <MyContext.Provider value={{
      state,
      setName, setTemperature, submitData, setSymptomatic, setInContact, validateData
    }}>{children}</MyContext.Provider>
  )
}

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export function useController() {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error(
      "useController should be used inside the ControllerProvider."
    );
  }

  return context;
}
