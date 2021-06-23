import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useLocation } from 'react-router-dom';

export default function Login(props) {
  const email = useRef();
  const password = useRef();
  const location = useLocation();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className={(props.flag===1)?"body":""}>
    <div className="container">
    <div class="form-container sign-in-container">
    <form onSubmit={handleClick} className="f1">
    <input placeholder="Email" type="email" required ref={email} className="i" />
    <input placeholder="Password" type="password" required minLength="6" ref={password} className="i" />
    <button className="b" type="submit" disabled={isFetching}>
      {isFetching ? <CircularProgress color="white" size="20px" /> : "Log In"}
    </button>
  </form>
  </div>
  </div>
  </div>
  );
}
