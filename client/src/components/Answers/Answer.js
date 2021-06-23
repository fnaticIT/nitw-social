import "./Answer.css";
import { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useHistory } from "react-router-dom";
import Topbar from "../topbar/Topbar";
export default function Answer() {
  const desc = useRef();
  const history = useHistory();

  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(user._id);
    const comment = desc.current.value;
    console.log(comment);
    try {
      await axios.put("/posts/comments/" + id + "/" + desc.current.value);
      console.log(desc.current.value);
      history.push(`/posts/${id}`);
    } catch (err) {}
  };

  return (
    <div >
    <Topbar />
      <div class="subscribe-box">
        <h2>Type your Answer</h2>
        <form class="subscribe" onSubmit={handleClick}>
          <textarea rows="4" cols="50" type="textbox" placeholder="Be polite" autocomplete="off" required="required" ref={desc} />
          <button type="submit">
            {" "}
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
}
