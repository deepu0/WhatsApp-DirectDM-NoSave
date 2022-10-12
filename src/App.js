import React, { useState } from "react";
import "./style.css";
const URL = "https://wa.me";
const isValidNumber = (num) => {
  console.log(num.length);
  if (num.length === 10 || num.length === 13) {
    return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(num);
  }
  return false;
};

export default function App() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  //const [isValid, setIsValid] = useState(false);
  //const regex= ^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$
  const size = number.length;
  const isValid = isValidNumber(number);

  const handleSendMessage = () => {
    if (isValid) {
      let url = `${URL}/${number}`;
      if (message) {
        url += `?text=${encodeURI(message)}`;
      }
      console.log({ number, url });

      window.open(url);
    }
  };

  return (
    <div className="box">
      <section className="container">
        <div>
          <h1>Direct Message(WhatsApp)</h1>
        </div>
        <div className="input-container">
          <input
            id="number"
            type="text"
            placeholder="Mobile Number"
            value={number}
            minLength={10}
            maxLength={13}
            onChange={(e) => setNumber(e.target.value)}
          />
          <span className="helper-text">
            ( With 🇮🇳+91 or without country code )
          </span>
          <br />
          {number.length > 8 && !isValid && (
            <span className="error">Enter valid number 😡</span>
          )}
        </div>

        <input
          id="message"
          placeholder="Message(optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} disabled={!isValid}>
          OPEN IN WHATSAPP
        </button>
      </section>
    </div>
  );
}
