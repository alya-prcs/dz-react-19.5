import React from "react";

function ImageGalleryItem({ image, onClick }) {
  return (
    <li className="gallery-item" onClick={() => onClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt="" />
    </li>
  );
}

export default React.memo(ImageGalleryItem);