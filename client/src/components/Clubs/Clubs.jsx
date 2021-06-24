import "./Clubs.css";
import { Event } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../topbar/Topbar";

export default function Clubs() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [clubs, setClubs] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setClubs(friendList.data);
        console.log(clubs);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  return (
    <div>
      <Topbar />
      <div className="sidebar">
        <div className="sidebarWrapper">
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <h1 className="">Clubs</h1>
          </li>
          <ul className="sidebarFriendList">
            {clubs.map(
              (friend) =>
                friend.isClub && (
                  <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                    <div className="rightbarFollowing">
                      <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                      <span className="side">{friend.username}</span>
                    </div>
                  </Link>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
