import React from "react";
import Star from "../assets/star.png";

const StarRating = ({ rating }) => {
  const starImages = [];

  for (let i = 0; i < rating; i++) {
    starImages.push(<img key={i} src={Star} alt="Star" />);
  }

  return <div>{starImages}</div>;
};

export default StarRating;
