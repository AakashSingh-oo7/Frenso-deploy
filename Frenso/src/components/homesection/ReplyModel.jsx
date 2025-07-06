import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import ImageIcon from "@mui/icons-material/Image";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createPostReply } from "../../store/Post/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  p: 4,
  borderRadius: 4,
};

export default function ReplyModel({handleClose,open,post, onPostUpdated}) {
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = React.useState(false);
  const [selectImage, setSelectImage] = React.useState("");
  const dispatch = useDispatch();
  

  const handleSelectImage = (event) => {
    setUploadImage(true);
    const imgFile = event.target.files[0];
    if (imgFile) {
      formik.setFieldValue("image", imgFile);
      setSelectImage(URL.createObjectURL(imgFile));
    }
    setUploadImage(false);
  };

  const handleSubmit = async (values) => {
    await dispatch(createPostReply(values));
    onPostUpdated?.();
    handleClose();
    console.log("Form Submitted:", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      postId: post?.id,
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex space-x-4">
            <Avatar
              onClick={() => navigate("/profile/6")}
              className="cursor-pointer"
              alt="username"
              src="#"
            />

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">XYZ</span>

                <span className="text-gray-500 text-sm">@xyz · 2min</span>
                <VerifiedUserIcon className="text-blue-500 text-sm" />
              </div>

              <div
                className="mt-2 cursor-pointer"
                onClick={() => navigate(`/post/1`)}
              >
                <p className="text-sm text-gray-800">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi!
                </p>
              </div>
            </div>
          </div>
          <section className="py-10">
            <div className="flex space-x-5">
              <Avatar alt="username" />

              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="content"
                      placeholder="What is happening?"
                      className={
                        "border-none outline-none text-xl bg-transparent"
                      }
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content ? (
                      <span className="text-red-500">
                        {formik.errors.content}
                      </span>
                    ) : null}
                  </div>
                  {/* <div>
                <img src="" alt="" />

            </div> */}
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectImage}
                          id=""
                        />
                      </label>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                      <TagFacesIcon className="text-[#1d9bf0]" />
                    </div>
                    <div>
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
