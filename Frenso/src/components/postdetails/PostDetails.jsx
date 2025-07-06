import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../homesection/PostCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findPostsByID } from "../../store/Post/Action";

const PostDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post } = useSelector((store) => store);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      dispatch(findPostsByID(id));
    }
  }, [dispatch, id]); // <-- added dependencies

  return (
    <React.Fragment>
      {/* Header */}
      <section className="z-50 flex items-center sticky top-0 bg-opacity-95 bg-white px-4 py-3">
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="text-xl font-bold opacity-90 ml-5">Details</h1>
      </section>

      {/* Main Post */}
      <section>
        {post.post ? (
          <PostCard post={post.post} />
        ) : (
          <p className="text-center text-gray-500 mt-4">Loading post...</p>
        )}
        <Divider sx={{ margin: "2rem 0rem" }} />
      </section>

      {/* Replies */}
      <section>
        {post.post?.replyPosts?.length > 0 ? (
          post.post.replyPosts.map((item) => (
            <PostCard key={item.id || item._id} post={item} />
          ))
        ) : (
          <p className="text-center text-gray-400">No replies yet.</p>
        )}
      </section>
    </React.Fragment>
  );
};

export default PostDetails;
