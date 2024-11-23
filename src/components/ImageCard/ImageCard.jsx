import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={styles.card} onClick={onClick}>
      <img
        src={image.small}
        alt={image.alt || "Image"}
        className={styles.image}
      />
    </li>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    small: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
