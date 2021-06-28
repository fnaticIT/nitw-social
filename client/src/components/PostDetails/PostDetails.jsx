import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PostDetails.css";
import Topbar from "../topbar/Topbar";
function PostDetails() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { id } = useParams();
  const [post, setPosts] = useState({});

  const [cmt, setcmt] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const friendList = await axios.get("/posts/comments/" + post._id);
        setcmt(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, [post]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/posts/" + id);
        setPosts(friendList.data);
        console.log(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [id]);

  return (
    <div>
      <Topbar />
      <div className="postCenter">
        <img className="postImg" src={PF + post.img} alt="no photo" />
      </div>
      <h2 className="posth">{post.desc}</h2>
      <hr className="t"></hr>
      <div className="t1">
        <h4 >ANSWERS - {cmt.length}</h4>
      </div>
      <div className="postBottomRight">
        {cmt.map((friend) => (
          <p className="c">{friend}</p>
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
