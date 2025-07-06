import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPost } from "../../store/Post/Action";
import PostCard from "./PostCard";
import { uploadToCloud } from "../../utils/uploadToCloud";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post text is required"),
});

const HomeSection = ({onPostUpdated}) => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((store) => store.post);
  console.log("Posts:", posts);

  const [uploadImage, setUploadImage] = useState(false);
  const [selectImage, setSelectImage] = useState("");

useEffect(() => {
  dispatch(getAllPost());
}, []);


  const handleSubmit = async (values, actions) => {
    console.log("Form Submitted:", values);
   await dispatch(createPost(values));
    actions.resetForm();
    onPostUpdated?.();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

 const handleSelectImage = async (event) => {
  setUploadImage(true);

  const file = event.target.files?.[0];
  if (!file) {
    console.error("No file selected");
    setUploadImage(false);
    return;
  }

  try {
    // Show local preview immediately
    setSelectImage(URL.createObjectURL(file));

    // Upload to cloud
    const uploadedUrl = await uploadToCloud(file);
    if (uploadedUrl) {
      formik.setFieldValue("image", uploadedUrl);
      console.log("Uploaded to:", uploadedUrl);
    }
  } catch (err) {
    console.error("Upload failed", err);
  }

  setUploadImage(false);
};


  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90 !text-left">Home</h1>
      </section>

      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username" />

          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening?"
                  className="border-none outline-none text-xl bg-transparent w-full"
                  {...formik.getFieldProps("content")}
                />
                {formik.errors.content && formik.touched.content ? (
                  <span className="text-red-500">{formik.errors.content}</span>
                ) : null}
              </div>

              {selectImage && (
                <div className="mt-3">
                  <img
                    src={selectImage}
                    alt="preview"
                    className="w-48 rounded-md"
                  />
                </div>
              )}

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
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
                    disabled={formik.isSubmitting || loading}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </form>
            <div>
              {selectImage && <img src={selectImage} alt="" />}
            </div>
          </div>
        </div>
      </section>

      <section>
        {loading && <p>Loading posts…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {posts?.map((item) => (
          <PostCard key={item.id} post={item} onPostUpdated={() => dispatch(getAllPost())} />

        ))}
      </section>
    </div>
  );
};

export default HomeSection;
