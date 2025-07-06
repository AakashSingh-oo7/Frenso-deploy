import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: 4,
  outline: "none",
  p: 4,
};

export default function SubscriptionModal({handleClose, open}) {
  const [plan, setPlan] = React.useState("Annually");
  const features = [
    "Builds trust and credibility with followers",
    "Increases visibility and reach on the platform",
    "Protects your identity from impersonation",
    "Boosts engagement with verified badge",
    "Access to exclusive platform features",
    "Improves chances for brand partnerships",
    "Establishes authority in your niche",
    "Your replies and posts gain more visibility",
  ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between shadow-lg bg-slate-400">
                <h1 className="text-xl pr-5">
                  You're just one step away from becoming a trusted, verified
                  member of our community.
                </h1>
                <VerifiedUserIcon sx={{ fontSize: "6rem", color: "#3b82f6" }} />
              </div>
              <div className="flex justify-between border rounded-full px-5 py-3 border-gray-500">
                <div>
                  <span
                    className={`${
                      plan === "Annually" ? "text-black" : "text-gray-400"
                    } cursor-pointer`}
                    onClick={() => setPlan("Annually")}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5">SAVE 12%</span>
                </div>
                <p
                  className={`${
                    plan === "Monthly" ? "text-black" : "text-gray-400"
                  } cursor-pointer`}
                  onClick={() => setPlan("Monthly")}
                >
                  Monthly
                </p>
              </div>
              <div>
                <div className="space-y-3 ">
                  {features.map((item) => (
                    <div className="flex items-center space-x-5">
                      <FiberManualRecordIcon
                        sx={{ width: "7px", height: "7px" }}
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="cursor-pointer flex justify-center bg-gray-500 text-white rounded-full px-5 py-3 mt-5">
                    <span className="line-through italic">₹7,800.00</span>
                    <span className="ph-5">₹6,800/year</span>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
