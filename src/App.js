import React, { useState } from 'react';
import './style.css';
const URL = 'https://wa.me';

export default function App() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    let mobNumber = number.replace(/[^\w\s]/gi, '').replace(/ /g, '');
    let url = `${URL}/${mobNumber}`;
    if (message) {
      url += `?text=${encodeURI(message)}`;
    }
    window.open(url);
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
            maxlength={10}
            onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
          />
          <span className="helper-text">
            ( Without any Prefix or any country code )
          </span>
        </div>
        <input
          id="message"
          placeholder="Message(optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} disabled={!(number.length === 10)}>
          OPEN IN WHATSAPP
        </button>
      </section>
    </div>
  );
}
