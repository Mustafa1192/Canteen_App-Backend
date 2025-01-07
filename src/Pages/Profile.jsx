import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faGift,
  faCartShopping,
  faBell,
  faCircleInfo,
  faNewspaper,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  // User Info Section
  const userInfo = (
    <div className="flex rounded-xl mb-4 gap-4 items-center">
      <img
        className="h-16 w-16 rounded-full"
        src="https://i.pinimg.com/736x/67/8a/5d/678a5db920a7faa44193f409e0e82a79.jpg"
        alt="Profile"
      />
      <div>
        <h1 className="text-lg font-extrabold text-[#333]">Furqan Ansari</h1>
        <h5 className="text-gray-600 text-sm">22bit16@aiktc.ac.in</h5>
        <Link
          to="/editprofile"
          className="text-blue-500 text-sm py-1 rounded-lg mt-1  flex items-center gap-2"
        >
          Edit Profile
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>
    </div>
  );

  // Menu Options
  const menuItems = [
    {
      label: "Your Orders",
      description: "Check your order history and status",
      icon: faCartShopping,
      route: "/orderhistory",
    },
    {
      label: "Terms & Conditions",
      description: "Understand our terms and conditions",
      icon: faNewspaper,
      route: "/term",
    },
    {
      label: "Privacy Policy",
      description: "Learn about how we protect your data",
      icon: faCircleInfo,
      route: "/policy",
    },
    {
      label: "About",
      description: "Learn more about our platform",
      icon: faCircleInfo,
      route: "/about",
    },
    {
      label: "FAQs",
      description: "Find answers to common questions",
      icon: faCircleInfo,
      route: "/faq",
    },
  ];

  const menuList = menuItems.map((item, index) => (
    <Link to={item.route} key={index}>
      <div className="flex justify-between items-start py-4">
        <div className="flex items-start gap-4">
          <FontAwesomeIcon icon={item.icon} className="text-[#777] mt-1" />
          <div>
            <h1 className="text-[#333] font-medium">{item.label}</h1>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        </div>
      </div>
      {index < menuItems.length - 1 && <hr className="border-gray-300" />}
    </Link>
  ));

  // Referral Option
  const referralOption = (
    <div className="py-4">
      <div className="flex items-start gap-4 cursor-pointer">
        <FontAwesomeIcon icon={faGift} className="text-green-500 mt-1" />
        <div>
          <h1 className="text-[#333] font-medium">Refer & Earn</h1>
          <p className="text-sm text-gray-500">
            Invite your friends to explore our website and unlock great experiences together!
          </p>
        </div>
      </div>
      <hr className="border-gray-300 mt-4" />
    </div>
  );

  // Handle Referral Share (WhatsApp)
  const handleReferralShare = () => {
    const message =
      "Discover amazing features on our platform! 🌟\n\nJoin now and see it for yourself: [https://yourwebsite.com] 🚀";
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Handle Help Email
  const handleHelpEmail = () => {
    const email = "help@yourwebsite.com";
    const subject = "Help Request";
    const body = "I am facing some issues with the platform. Please assist.";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF5FF] lg:px-60 p-5 relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <a href="home"><FontAwesomeIcon
          icon={faChevronLeft}
          className="text-gray-700 cursor-pointer"
        /></a>
        <button
          onClick={handleHelpEmail}
          className="p-2 top-5 right-5 bg-[#715a1ebc] text-white font-extrabold text-sm py-2 px-4 rounded-2xl transition-all"
        >
          Help
        </button>
      </div>

      {/* User Info Section */}
      {userInfo}

      {/* Line Separator */}
      <hr className="border-gray-300 mb-4" />

      {/* Menu Section */}
      <div className="bg-[#FAF5FF] rounded-xl py-4">
        <h1 className="text-[#AAB9C5] text-lg font-medium mb-4">Menu</h1>
        {menuList}
      </div>

      {/* Referral Section */}
      <div onClick={handleReferralShare}>{referralOption}</div>

      {/* Logout Option */}
      <div className="py-4">
        <Link to="/" className="flex items-start gap-4">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-red-500 mt-1"
          />
          <div>
            <h1 className="text-[#333] font-medium">Log Out</h1>
          </div>
        </Link>
      </div>

      {/* Bottom Fixed Popup */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center">
        <a href="home"><button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600">
          Browse Items
        </button></a>
      </div>
    </div>
  );
};

export default Profile;
