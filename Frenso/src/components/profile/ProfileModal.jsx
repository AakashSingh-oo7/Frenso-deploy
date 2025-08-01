import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../store/auth/Action";
import { uploadToCloud } from "../../utils/uploadToCloud";
import { getAllPost } from "../../store/Post/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ProfileModal({ open, handleClose, onPostUpdated }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const [uploading, setUploading] = React.useState(false);
  const [selectedAvatar, setSelectedAvatar] = React.useState("");
  const [selectedBackground, setSelectedBackground] = React.useState("");

  const handleImageChange = async (event) => {
    const { name } = event.target;

    setUploading(true);
    const file = await uploadToCloud(event.target.files[0]);
    formik.setFieldValue(name, file);

    if (name === "image") {
      setSelectedAvatar(file);
    } else if (name === "backgroundImage") {
      setSelectedBackground(file);
    }
    setUploading(false);
  };

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    onPostUpdated?.();
    setSelectedAvatar("");
    setSelectedBackground("");
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fullName: auth.user?.fullName || "",
      website: auth.user?.website || "",
      location: auth.user?.location || "",
      bio: auth.user?.bio || "",
      backgroundImage: auth.user?.backgroundImage || "",
      image: auth.user?.image || "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <p>Edit Profile</p>
            </div>
            <Button type="submit" disabled={uploading}>
              Save
            </Button>
          </div>

          <div className="overflow-y-scroll hideScrollBar overflow-x-hidden h-[80vh]">
            {/* Background image */}
            <div className="w-full">
              <div className="relative">
                <img
                  className="w-full h-[12rem] object-cover object-center"
                  src={
                    selectedBackground ||
                    auth.user?.backgroundImage ||
                    "/default-background.jpg"
                  }
                  alt="background"
                />
                <input
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  name="backgroundImage"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Avatar */}
            <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
              <div className="relative">
                <Avatar
                  src={
                    selectedAvatar || auth.user?.image || "/default-avatar.png"
                  }
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    border: "4px solid white",
                  }}
                />
                <input
                  type="file"
                  className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Form fields */}
            <div className="flex flex-col space-y-3">
              <TextField
                margin="normal"
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                margin="normal"
                fullWidth
                multiline
                rows={4}
                id="bio"
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />

              <TextField
                margin="normal"
                fullWidth
                id="website"
                name="website"
                label="Website"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />

              <TextField
                margin="normal"
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />

              <div className="my-3">
                <p className="text-lg">Birth date . Edit</p>
                <p className="text-2xl">
                  {auth.user?.birthDate || "Not specified"}
                </p>
              </div>

              <p className="py-3 text-lg">Edit Professional Profile</p>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
