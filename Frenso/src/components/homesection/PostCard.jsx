import React, { useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import BarChartIcon from "@mui/icons-material/BarChart";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import ReplyModel from "./ReplyModel";
import { deletePost, editPost, createRePost, likePost } from "../../store/Post/Action";

const PostCard = ({ post, onPostUpdated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpenReplyModal = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLikePost = async () => {
    await dispatch(likePost(post?.id));
    onPostUpdated?.();
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(post?.id));
      onPostUpdated?.();
    }
    handleClose();
  };

  const handleEditPost = async () => {
    const newContent = prompt("Edit your post:", post?.content);
    if (newContent && newContent.trim() !== "") {
      await dispatch(editPost(post?.id, { content: newContent.trim() }));
      onPostUpdated?.();
    }
    handleClose();
  };

  const handleCreateRePost = async () => {
    await dispatch(createRePost(post?.id));
    onPostUpdated?.();
  };

  return (
    <>
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${post?.user.id}`)}
          className="cursor-pointer"
          alt={post?.user?.fullName}
          src={post?.user?.image || ""}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{post?.user?.fullName}</span>
              <span className="text-gray-500">
                @{post?.user?.fullName.split(" ").join("_")} •{" "}
                {new Date(post?.createdAt).toLocaleTimeString()}
              </span>
              <VerifiedUserIcon className="text-blue-500" />
            </div>
            <div>
              <Button
                onClick={handleClick}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
              >
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                <MenuItem onClick={handleEditPost}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div onClick={() => navigate(`/post/${post?.id}`)} className="cursor-pointer">
              <p className="mb-2 p-0">{post?.content}</p>
              {post?.image && (
                <img
                  src={post?.image}
                  className="w-[28rem] border border-gray-400 p-5 rounded-md"
                  alt="post"
                />
              )}
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-500">
                <ChatBubbleOutlineIcon className="cursor-pointer" onClick={handleOpenReplyModal} />
                <p>{post?.totalReplies}</p>
              </div>

              <div className={`${post?.reposted ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                <RepeatIcon className="cursor-pointer" onClick={handleCreateRePost} />
                <p>{post?.totalRePosts}</p>
              </div>

              <div className={`${post?.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                {post?.liked ? (
                  <FavoriteIcon className="cursor-pointer" onClick={handleLikePost} />
                ) : (
                  <FavoriteBorderIcon className="cursor-pointer" onClick={handleLikePost} />
                )}
                <p>{post?.totalLikes}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-500">
                <BarChartIcon className="cursor-pointer" />
                <p>{post?.replyPosts?.length ?? 0}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-500">
                <FileUploadIcon className="cursor-pointer" />
                <p>{post?.rePostUsersId?.length ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReplyModel
        open={openReplyModal}
        onPostUpdated={() => onPostUpdated?.()}
        handleClose={handleCloseReplyModal}
        post={post}
      />
    </>
  );
};

export default PostCard;
