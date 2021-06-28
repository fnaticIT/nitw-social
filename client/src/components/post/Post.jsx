import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [cmt, setcmt] = useState([]);
  const desc = useRef();
  const history = useHistory();
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

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const comment = desc.current.value;
    console.log(comment);
    try {
      await axios.put("/posts/comments/" + post._id + "/" + desc.current.value);
      console.log(desc.current.value);
      window.location.reload();
    } catch (err) {}
  };
  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };
  const openForm = (e) => {
    // dispatch(getPost(post._id, history));
    history.push(`/answers/` + post._id);
  };
  const handledelete = () => {
    console.log("delete");
    try {
      axios.delete("/posts/" + post._id, post);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">{currentUser._id === post.userId && <p onClick={handledelete} className="b">DELETE</p>}</div>
        </div>
        <div className="postCenter" onClick={openPost}>
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>

          <div className="postBottomRight">
            {/*}   {cmt.map((friend) => (
      
              <p className="rightbarFollowingName">{friend}</p>
            
            ))}*/}
          </div>
          {/*} <form className="CommentForm" onSubmit={handleClick}>
            <input placeholder={"Add a comment " + user.username} className="shareInput" ref={desc} />
            <button className="shareButton" type="submit" onClick={openPost}>
              addComment
            </button>
            
          </form>*/}
          <div className="postb">
            <div className="postb1">
              <button type="submit" onClick={openPost} className="b">
                VIEW ANSWERS
              </button>
            </div>
            <div className="postb2">
              <button className="b" onClick={openForm}>
                ANSWER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
