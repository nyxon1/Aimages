import React, { useState, useRef } from "react";

const Modal = ({ setModalOpen, setSelectedImage, selectedImage, generateVariations }) => {
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const checkSize = () => {
    if (ref.current && ref.current.naturalWidth == 256 && ref.current.naturalHeight == 256) {
      generateVariations();
    } else {
      setError('Error: Choose a 256 x 256 image');
    }
  };

  return (
    <div className="modal">
      <div onClick={closeModal}>✖</div>
      <div className="img-container">
        {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded image" onLoad={checkSize} />}
      </div>
      <p>{error || "* Image must be 256 x 256 px"}</p>
      {!error && <button onClick={checkSize}>Generate</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  );
};

export default Modal;
