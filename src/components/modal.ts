import React, { useState, useRef, ChangeEvent } from "react";

interface ModalProps {
  setModalOpen: (value: boolean) => void;
  setSelectedImage: (value: File | null) => void;
  selectedImage: File | null;
  generateVariations: () => void;
}

const Modal: React.FC<ModalProps> = ({
  setModalOpen,
  setSelectedImage,
  selectedImage,
  generateVariations
}) => {
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLImageElement | null>(null);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  }

  const checkSize = () => {
    if (ref.current && ref.current.width === 256 && ref.current.height === 256) {
      generateVariations();
    } else {
      setError('Error: Choose 256 x 256 image');
    }
  }

  return (
    <div className="modal">
      <div onClick={closeModal}>✖</div>
      <div className="img-container">
        {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded image" />}
      </div>
      <p>{error || "* Image must be 256 x 256 px .png file"}</p>
      {!error && <button onClick={checkSize}>Generate</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  )
}

export default Modal;
