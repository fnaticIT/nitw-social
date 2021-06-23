import axios from "axios";
import { useRef, useContext } from "react";
import "./register.css";
import { useHistory } from "react-router";
import Login from "../login/Login";
let container;
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const isClub = useRef();

  const handleClick = async (e) => {
    //console.log(password);
    //console.log(passwordAgain);
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      console.log("hell2");
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        isClub: (isClub.current.value==="true")?true:false,
      };
      try {
        await axios.post("/auth/register", user);
        console.log(user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  window.addEventListener("load", () => {
    container = document.getElementById("container");
  });

  const signup = async (e) => {
    container.classList.add("right-panel-active");
  };

  const signin = async (e) => {
    container.classList.remove("right-panel-active");
  };

  return (
    <div className="body">
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <form onSubmit={handleClick} className="f">
            <h1>Create Account</h1>
            <input placeholder="Username" required ref={username} className="i" />
            <input placeholder="Email" required ref={email} type="email" className="i" />
            <input placeholder="Password" required ref={password} type="password" minLength="6" className="i" />
            <input placeholder="Password Again" required ref={passwordAgain} type="password" className="i" />
            <input placeholder="Club login - true/false" required ref={isClub} type="text" className="i" />

            <button className="b" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      
          <Login flag={0}/>
      
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button class="ghost" id="signIn" onClick={signin} className="b">
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>NITW CONNECT!</h1>
              <p className="p">Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp" onClick={signup} className="b">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
