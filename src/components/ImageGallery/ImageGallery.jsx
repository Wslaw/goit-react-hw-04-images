import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';


const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map(image => (
      <ImageGalleryItem
        key={nanoid()}
        image={image}
        onClick={() => onImageClick(image)}
      />
    ))}
  </ul>
);

export default ImageGallery;
