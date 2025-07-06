import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


import {
  Avatar,
  Box,
  Button,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import PostCard from "../homesection/PostCard";
import ProfileModal from "./ProfileModal";

import { getAllPost, getUsersPosts, getUserReplies, getUserLikedPosts } from "../../store/Post/Action";
import { findUserById, followUserAction } from "../../store/auth/Action";

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { auth, post } = useSelector((store) => store);
  const user = auth.foundUser;

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUserLikedPosts(id));
  }, [id]);

  useEffect(() => {
    if (tabValue === "2") {
      dispatch(getUserReplies(id));
    }
    if (tabValue === "4") {
      dispatch(getUserLikedPosts(id));
    }
  }, [tabValue, id, dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBack = () => navigate(-1);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  const handleFollowUser = () => {
    dispatch(followUserAction(id));
  };

  return (
    <div className="transform -translate-x-[30px]">
      {/* Header */}
      <section className="z-50 flex items-center sticky top-0 bg-opacity-95 bg-white px-4 py-3">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <h1 className="text-xl font-bold opacity-90 ml-5">{user?.fullName}</h1>
      </section>

      {/* Background and Avatar */}
      <section className="relative w-full">
        <img
          className="w-full h-[15rem] object-cover"
          src={user?.backgroundImage || "https://via.placeholder.com/800x200"}
          alt="background"
        />
        <div className="absolute left-6 bottom-[-4rem]">
          <Avatar
            src={user?.image || "https://via.placeholder.com/150"}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
        </div>
      </section>

      {/* Edit or Follow */}
      <div className="flex justify-end w-full mt-4 pr-4">
        {user?.req_user ? (
          <Button onClick={handleOpenProfileModal} variant="contained" sx={{ borderRadius: "20px" }}>
            Edit Profile
          </Button>
        ) : (
          <Button onClick={handleFollowUser} variant="contained" sx={{ borderRadius: "20px" }}>
            {user?.followed ? "UnFollow" : "Follow"}
          </Button>
        )}
      </div>

      {/* User Info */}
      <div className="ml-10 mt-5">
        <div className="flex items-center">
          <h1 className="font-bold text-lg">{user?.fullName}</h1>
          <VerifiedUserIcon className="text-blue-500 ml-2" />
        </div>
        <h1 className="text-gray-500">@{user?.fullName?.split(" ").join("_").toLowerCase()}</h1>
      </div>

      <div className="mt-2 space-y-3 ml-10">
        <p>{user?.bio || "No bio yet."}</p>
        <div className="py-1 flex space-x-5 text-gray-500">
          <div className="flex items-center">
            <BusinessCenterIcon /><p className="ml-2">{user?.education || "Not specified"}</p>
          </div>
          <div className="flex items-center">
            <LocationOnIcon /><p className="ml-2">{user?.location || "Unknown"}</p>
          </div>
          <div className="flex items-center">
            <CalendarMonthIcon />
            <p className="ml-2">
              Joined{" "}
              {user?.createdAt
                ? new Date(user?.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                : "some time ago"}
            </p>
          </div>
        </div>
        <div className="flex space-x-5 items-center font-semibold">
          <div className="flex items-center space-x-1">
            <span>{user?.following?.length || 0}</span>
            <span className="text-gray-500">Following</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{user?.followers?.length || 0}</span>
            <span className="text-gray-500">Followers</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange}>
                <Tab label="Posts" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>

            <TabPanel value="1">
              {post.posts?.length
                ? post.posts.map((p) => <PostCard key={p.id} post={p} />)
                : <p>No posts yet</p>}
            </TabPanel>

            <TabPanel value="2">
              {post.replies?.length
                ? post.replies.map((p) => <PostCard key={p.id} post={p} />)
                : <p>No replies yet</p>}
            </TabPanel>

            <TabPanel value="3">
              {post.posts?.filter(p => p.media).length
                ? post.posts.filter(p => p.media).map((p) => <PostCard key={p.id} post={p} />)
                : <p>No media yet</p>}
            </TabPanel>

            <TabPanel value="4">
              {post.likedPosts?.length
                ? post.likedPosts.map((p) => <PostCard key={p.id} post={p} />)
                : <p>No liked posts yet</p>}
            </TabPanel>
          </TabContext>
        </Box>
      </section>

      {/* Modal */}
      <ProfileModal
        onPostUpdated={() => dispatch(getAllPost())}
        handleClose={handleCloseProfileModal}
        open={openProfileModal}
      />
    </div>
  );
};

export default Profile;
