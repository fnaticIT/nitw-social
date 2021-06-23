import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function Topbar() {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
  return (
    <div id="topbarContainer" className={"topbarContainer2"}>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">NITW Connect !</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to=" "></Link>
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
