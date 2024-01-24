import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css'

const modalRoot = document.getElementById('modal-root');

const Modal = ({ image, onClose }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal)
    }
  })

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <img className={styles.img} src={image} alt="" />
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;


