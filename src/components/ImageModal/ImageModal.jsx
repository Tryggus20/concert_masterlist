import React from "react";
import './ImageModal.css'
const ImageModal = ({ imageUrl, onClose }) => {
    return (
      <div className="image-modal" onClick={onClose}>
        <div className="modal-content">
          <img src={imageUrl} alt="Full-size" />
        </div>
      </div>
    );
  };
  export default ImageModal;
