const App = () => {
  const surpriseOptions = [
    'A blue ostrich eating melon',
    'A matisse style shark on the telephone',
    'A pinaple sunbathing on an island'
  ]

  const getImages = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: "BLUGH"
        }),
        headers: {
          "Content-type": "applications/json"
        }
      }
      const response = await fetch('http://localhost:8000/images', options)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <section className="search-section">
        <p>Start with a detailed description 
          <span className="surprise">Surprise me</span>
          </p>
          <div className="input-container">
            <input 
              placeholder="Ann impessionist oil 
              painting of a sunflower in a purple vase..."
            />
            <button onClick={getImages}>Generate</button>
          </div>
      </section>
      <section className="image-section"></section>
    </div>
  );
}

export default App;
