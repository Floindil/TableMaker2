import { useEffect, useState } from "react";
import { getPlayers, createPlayer } from "../api/players";
import PlayerModal from "../components/PlayerModal";

export default function PlayerPage() {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleCreate = async (player) => {
    await createPlayer(player);
    loadPlayers();
  };

  return (
    <div className="container">
      <h2>Players</h2>

      <button onClick={() => setShowModal(true)}>Add Player</button>

      {players.map((p, i) => (
        <div key={i} className="card">
          {p.name}
        </div>
      ))}

      {showModal && (
        <PlayerModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  );
}