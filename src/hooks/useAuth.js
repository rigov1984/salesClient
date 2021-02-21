/* eslint-disable import/no-anonymous-default-export */
import { useContext } from "react";
import { AuthContext } from "../providerss/AuthProvider";



export default () => useContext(AuthContext);