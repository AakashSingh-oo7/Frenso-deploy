import React, { useState } from "react";
import { Button } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import AuthModal from "./AuthModel";

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const handleOpenAuthModel = () => setOpenAuthModel(true);
  const handleCloseAuthModel = () => setOpenAuthModel(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/89125.jpg')] bg-cover bg-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-24 h-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Welcome to Frenso
          </h1>
          <h2 className="text-lg font-medium text-gray-600 text-center">
            Join the community
          </h2>

          <div className="w-full flex flex-col items-center space-y-3 mt-4">
            <GoogleLogin width={330} />
            <p className="text-gray-500">OR</p>

            <Button
            onClick={handleOpenAuthModel}
              fullWidth
              variant="contained"
              size="large"
              sx={{ borderRadius: "29px", py: "7px" }}
            >
              Create Account
            </Button>

            <p className="text-xs text-gray-600 text-center">
              By signing up, you agree to the Terms of Service and Privacy Policy
            </p>

            <h3 className="text-md font-medium text-gray-700">Already have an account?</h3>

            <Button
            onClick={handleOpenAuthModel}
              fullWidth
              variant="outlined"
              size="large"
              sx={{ borderRadius: "29px", py: "7px" }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Authentication;