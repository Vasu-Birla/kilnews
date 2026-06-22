// UserAvatar.jsx
import React from "react";

const UserAvatar = ({ user, size = 40 }) => {
  const name = user?.name || "Anonymous";
  const profileImage = user?.profileImage;

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    // marginRight: "10px",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: size / 2,
    backgroundColor: profileImage ? "transparent" : stringToColor(name),
  };

  if (profileImage) {
    return <img src={profileImage} alt={name} style={avatarStyle} />;
  } else {
    const initial = name.charAt(0).toUpperCase();
    return <div style={avatarStyle}>{initial}</div>;
  }
};

export default UserAvatar;
