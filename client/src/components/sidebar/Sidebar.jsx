import "./sidebar.css";
import { RssFeed, Event } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar(user) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/usersList");
        setClubs(friendList.data);
        console.log(clubs);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to="/clubs" className="side">
              <span className="sidename">Clubs</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to="/friends" className="side">
              <span className="sidename">Friends</span>
            </Link>
          </li>
        </ul>
        
        <hr className="sidebarHr" />
        <li className="sidebarListItem">
          <Event className="sidebarIcon" />
          <span className="headside">Clubs</span>
        </li>
        <ul className="sidebarFriendList">
          {clubs.map(
            (friend) =>
              friend.isClub && (
                <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                  <div className="rightbarFollowing">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                    <span className="name">{friend.username}</span>
                  </div>
                </Link>
              )
          )}
        </ul>
      </div>
    </div>
  );
}
