import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageModal.module.css";

const ImageModal = ({ image, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleOverlayClick}>
      <img src={image} alt="Modal content" />
    </div>
  );
};

ImageModal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
