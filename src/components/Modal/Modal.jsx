import React, { useEffect } from 'react';

const Modal = (image, onClose) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onclose]);

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};
export default Modal;
