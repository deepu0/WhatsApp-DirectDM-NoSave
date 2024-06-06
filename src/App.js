import React, { useState } from "react";
import "./style.css";

const URL = "https://wa.me";
const isValidNumber = (num) => {
  const cleanNumber = num.replace(/\D/g, ""); // Remove non-digit characters
  if (cleanNumber.length === 10 || cleanNumber.length === 12) {
    return /^(91)?[789]\d{9}$/.test(cleanNumber);
  }
  return false;
};

export default function App() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const isValid = isValidNumber(number);

  const handleSendMessage = () => {
    if (isValid) {
      let cleanNumber = number.replace(/\D/g, ""); // Remove non-digit characters
      if (cleanNumber.length === 10) {
        cleanNumber = `91${cleanNumber}`; // Add country code if not provided
      }
      let url = `${URL}/${cleanNumber}`;
      if (message) {
        url += `?text=${encodeURIComponent(message)}`;
      }
      console.log({ number: cleanNumber, url });

      // Vibration
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      // Add animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);

      window.open(url, "_blank"); // Open in a new tab
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    setNumber(value);
  };

  return (
    <div className="container">
      <h1>Direct Message</h1>
      <div className="input-container">
        <input
          id="number"
          type="tel"
          placeholder="Mobile Number"
          value={number}
          minLength={10}
          maxLength={13}
          onChange={handleNumberChange}
        />
        <span className="helper-text">
          (With 🇮🇳 +91 or without country code)
        </span>
        <br />
        {number.length > 8 && !isValid && (
          <span className="error">Enter a valid number 😡</span>
        )}
      </div>

      <input
        id="message"
        placeholder="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        disabled={!isValid}
        className={isAnimating ? "animating" : ""}
      >
        OPEN IN WHATSAPP
      </button>
    </div>
  );
}