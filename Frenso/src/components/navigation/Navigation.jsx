import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigationmenu } from "./NavigationMenu";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/Action";

const Navigation = () => {
  const navigate = useNavigate();
  const { auth } = useSelector(store => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <div className="h-screen sticky top-0 px-4 flex flex-col w-full justify-between">
      
      {/* Top Logo */}
      <div className="py-5">
        <img src="/logo.svg" alt="Frenso Logo" className="h-[40px] w-[40px]" />
      </div>

      {/* Navigation Items */}
      <div className="space-y-4 flex flex-col">
        {navigationmenu.map((item) => (
          <div
            key={item.title}
            className="cursor-pointer flex space-x-3 items-center py-2 hover:bg-gray-100 rounded-lg px-2"
            onClick={() =>
              item.title === "Profile"
                ? navigate(`/profile/${auth.user?.id}`)
                : navigate(item.path)
            }
          >
            {item.icon}
            <p className="text-lg">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Bottom Section (Avatar/Admin) */}
      <div className="flex items-center space-x-3 mt-6 mb-4 p-2 hover:bg-gray-100 rounded-lg">
        <Avatar
          alt={auth.user?.fullName}
          src={auth.user?.image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
        />
        <div className="flex flex-col text-left">
          <p className="text-sm font-medium">{auth.user?.fullName}</p>
          <span className="opacity-70 text-xs">
            @{auth.user?.fullName?.split(" ").join("_").toLowerCase()}
          </span>
        </div>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
