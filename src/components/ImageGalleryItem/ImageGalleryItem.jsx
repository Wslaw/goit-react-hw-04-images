import React from 'react';


const ImageGalleryItem = ({ image, onClick }) => (
  <li className="ImageGalleryItem" onClick={onClick}>
    <img src={image.webformatURL} alt="" className="ImageGalleryItem-image" />
  </li>
);

export default ImageGalleryItem;
