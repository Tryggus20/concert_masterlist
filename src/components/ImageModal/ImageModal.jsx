import React from "react";
import './ImageModal.css'
const ImageModal = ({ imageUrl, onClose }) => {
  // In detail view allows user to click on the picture to expand it
    return (
      <div className="image-modal" onClick={onClose}>
        <div className="modal-content">
          <img src={imageUrl} alt="Full-size" />
        </div>
      </div>
    );
  };
  export default ImageModal;
