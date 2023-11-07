import React, { useState, ChangeEvent } from "react";
import Modal from "./components/modal";

const App: React.FC = () => {
  const [images, setImages] = useState<Array<{ url: string } | null>>([]);
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const surpriseOptions: string[] = [
    'A blue ostrich eating melon',
    'MegaK coursant enjoing his first job as programist',
    'Black Ford Mustang burnout on the street'
  ];

  const surpriseMe = () => {
    setImages([]);
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  }

  const getImages = async () => {
    setImages([]);
    if (value === null) {
      setError('Error! Must have a search term');
      return;
    }
    try {
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({
          message: value
        }),
        headers: {
          "Content-type": "application/json"
        }
      };
      const response = await fetch('http://localhost:8000/images', options);
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error("Błąd parsowania danych JSON:", error);
    }
  }

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      setModalOpen(true);
      setSelectedImage(file);
      e.target.value = ''; // Czyszczenie wartości pola input
      try {
        const options: RequestInit = {
          method: "POST",
          body: formData
        };
        const response = await fetch('http://localhost:8000/upload', options);
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const generateVariations = async () => {
    setImages([]);
    if (selectedImage === null) {
      setError('Error! Must have an existing image!');
      setModalOpen(false);
      return;
    }
    try {
      const options: RequestInit = {
        method: "POST",
      };
      const response = await fetch('http://localhost:8000/variations', options);
      const data = await response.json();
      console.log(data);
      setImages(data);
      setError(null);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <section className="search-section">
        <p>Start with a detailed description
          <span className="surprise" onClick={surpriseMe}>Surprise me</span>
        </p>
        <div className="input-container">
          <input
            value={value || ''}
            placeholder=""
            onChange={e => setValue(e.target.value)}
          />
          <button onClick={getImages}>Generate</button>
        </div>
        <p className="extra-info">Or
          <span>
            <label className="upload" htmlFor="files"> upload an image </label>
            <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          </span>
          to create variation.
        </p>
        {error && <p>{error}</p>}
        {modalOpen && <div className="overlay">
          <Modal
            setModalOpen={setModalOpen}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            generateVariations={generateVariations} />
        </div>}
      </section>
      <section className="image-section">
        {images?.map((image, index) => (
          image && <img key={index} src={image.url} alt={`Generated image of ${value}`} />
        ))}
      </section>
    </div>
  );
}

export default App;
