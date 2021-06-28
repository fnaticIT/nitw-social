import "./topbar.css";
import { LaptopWindows, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import axios from "axios";

export default function Topbar() {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const name = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const f = user.isClub;
  const [th, setth] = useState({ f });
  function logout() {
    localStorage.clear();
    history.push("/register");
    window.location.reload();
  }
  const [scrollNav, setScrollNav] = useState(true);
  const changeNav = () => {
    console.log(scrollNav);
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const handle = (e) => {
    e.preventDefault();
    const n = name.current.value;
    history.push("/profile/" + n);
  };
  const theme = async () => {
    try {
      console.log(user.isClub);
      console.log(user);
      const user1 = {
        id: user._id,
        isClub: true,
      };
      console.log(user1);
      await axios.put("/users/update/isClub", user1);
      console.log(user);
      // window.location.reload();
    } catch (err) {}
  };
  return (
    <div id="topbarContainer" className={"topbarContainer2"}>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">NITW Connect !</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <form onSubmit={handle} className="s">
            <input placeholder="Search for friend, post or video" className="searchInput" ref={name} />
            <button type="submit" className="bb">
              <Search className="searchIcon" />
            </button>
          </form>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to=" "></Link>
        </div>
        <div className="topbarIcons">
          <button onClick={theme} className="li">
            <h2>Theme</h2>
          </button>
        </div>
        <div className="topbarIcons">
          <Link onClick={logout} className="li">
            <h2>Logout</h2>
          </Link>
        </div>

        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
