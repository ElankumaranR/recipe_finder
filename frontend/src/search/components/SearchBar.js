import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [timeLimit, setTimeLimit] = useState('');

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const formRef = useRef(null);

  // Handle microphone icon click
  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  // Effect to handle auto-submit when speech stops
  useEffect(() => {
    if (!listening && transcript.trim()) {
      setQuery(transcript);  // Set the query to transcribed text

      // Delay form submission for 1 second after transcription stops
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.requestSubmit(); // Trigger form submission
        }
      }, 1000); // Adjust delay as needed (1000ms = 1 second)
    }
  }, [listening, transcript]); // Run when listening or transcript changes

  // Handle input changes
  const handleInputChange = (event) => setQuery(event.target.value);
  const handleIngredientsChange = (event) => setIngredients(event.target.value);
  const handleTimeLimitChange = (event) => setTimeLimit(event.target.value);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload or navigation
    if (query.trim() || ingredients.trim() || timeLimit) {
      onSearch(query, ingredients, timeLimit);
      setQuery('');
      setIngredients('');
      setTimeLimit('');
      resetTranscript();
    }
  };

  // Early return if browser doesn’t support speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form" ref={formRef}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          <span className="mic-icon" onClick={handleMicClick} aria-label="Microphone">
            <i className={`fas fa-microphone${listening ? '-slash' : ''}`}></i>
          </span>
        </div>
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={handleIngredientsChange}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Time limit (minutes)"
          value={timeLimit}
          onChange={handleTimeLimitChange}
          className="search-input"
        />
        
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
