import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import SubscriptionModal from "../subscriptioModal/SubscriptionModal";

const RightPart = () => {
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);

  // Update <body> class & save theme
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    console.log("Theme changed to:", theme === "light" ? "dark" : "light");
  };

  const whatsHappening = [
    { category: "Sports", title: "FIFA World Cup 2024", detail: "Philippines vs Switzerland" },
    { category: "Entertainment", title: "#TheMarvels", posts: "34.3k" },
    { category: "Tech", title: "#AIRevolution", posts: "12.1k" },
    { category: "Politics", title: "#Election2024", posts: "78.2k" },
    { category: "Music", title: "#GrammyAwards", posts: "45.9k" },
  ];

  return (
    <div className="py-5 top-0 space-y-5">
      {/* Search */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="py-3 rounded-full text-gray-700 w-full pl-12 shadow-sm border border-gray-300"
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        <Brightness4Icon
          onClick={handleChangeTheme}
          className="ml-3 cursor-pointer text-gray-600"
        />
      </div>

      {/* Get Verified */}
      <section>
        <h1 className="text-xl font-bold">Get Verified</h1>
        <p className="font-medium my-2">Subscribe to unlock new features</p>
        <Button
          variant="contained"
          sx={{ px: 3, py: 1, borderRadius: "25px" }}
          onClick={handleOpenSubscriptionModal}
        >
          Get Verified
        </Button>
      </section>

      {/* What's happening */}
      <section>
        <h1 className="font-bold text-xl py-2">What's happening?</h1>

        {whatsHappening.map((item, index) => (
          <div
            key={index}
            className="flex justify-between w-full py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 cursor-pointer"
          >
            <div>
              <p className="text-xs text-gray-500">
                {item.category} {item.posts && "- Trending"}
              </p>
              <p className="font-bold">{item.title}</p>
              {item.posts && <p className="text-xs text-gray-500">{item.posts} posts</p>}
              {item.detail && <p className="text-sm text-gray-600">{item.detail}</p>}
            </div>
            <MoreHorizIcon className="text-gray-500" />
          </div>
        ))}
      </section>

      <SubscriptionModal
        open={openSubscriptionModal}
        handleClose={handleCloseSubscriptionModal}
      />
    </div>
  );
};

export default RightPart;
