import { useState } from "react";

export default function PlayerModal({ onClose, onSave }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    onSave({ name });
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>New Player</h3>
        <input
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
};

const modal = {
  background: "white",
  padding: "20px",
  margin: "100px auto",
  width: "300px",
  borderRadius: "6px",
};