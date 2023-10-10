import React from "react";

const Test1 = () => {
  var imageData = [
    "http://via.placeholder.com/400x400/",
    "http://via.placeholder.com/500x700/",
    "http://via.placeholder.com/600x500/",
    "http://via.placeholder.com/600x800/",
    "http://via.placeholder.com/600x800/",
    "http://via.placeholder.com/600x800/",
  ];

  return (
    <div>
      {imageData.map((item, index) => (
        <img key={index} src={item} alt="" />
      ))}
    </div>
  );
};

export default Test1;
