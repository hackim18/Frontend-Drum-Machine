import React, { useState, useEffect } from "react";
import "./App.css";
import bankOne from "./data/bankOne";
import bankTwo from "./data/bankTwo";

const DrumMachine = () => {
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [currentBank, setCurrentBank] = useState(bankOne);
  const [bankName, setBankName] = useState("Heater Kit");

  const playSound = (key, id) => {
    const audio = document.getElementById(key);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    setDisplay(id);
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const drumPad = currentBank.find((pad) => pad.key === key);
    if (drumPad) {
      playSound(drumPad.key, drumPad.id);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentBank, volume]);

  const toggleBank = () => {
    if (currentBank === bankOne) {
      setCurrentBank(bankTwo);
      setBankName("Smooth Piano Kit");
    } else {
      setCurrentBank(bankOne);
      setBankName("Heater Kit");
    }
    setDisplay("");
  };

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pads">
        {currentBank.map((pad) => (
          <div key={pad.id} id={pad.id} className="drum-pad" onClick={() => playSound(pad.key, pad.id)}>
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </div>
        ))}
      </div>
      <div className="controls">
        <div className="volume-control">
          <label htmlFor="volume">Volume: {Math.round(volume * 100)}</label>
          <input type="range" id="volume" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} />
        </div>
        <div className="bank-toggle">
          <label htmlFor="bank">{bankName}</label>
          <div id="bank" className={`toggle-switch ${currentBank === bankTwo ? "active" : ""}`} onClick={toggleBank}></div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
