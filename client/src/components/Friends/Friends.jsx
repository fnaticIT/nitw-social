import "./Friends.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../topbar/Topbar";
export default function Friends({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const ProfileRightbar = () => {
    return (
      <>
        <h1>User friends</h1>
        <div className="rightbarFollowings">
          {friends.map(
            (friend) =>
              friend.isClub !== true && (
                <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                  <div className="rightbarFollowing">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                </Link>
              )
          )}
        </div>
      </>
    );
  };
  return (
    <div>
      <Topbar />

      <div className="rightbar">
        <div className="rightbarWrapper">
          <ProfileRightbar />
        </div>
      </div>
    </div>
  );
}
