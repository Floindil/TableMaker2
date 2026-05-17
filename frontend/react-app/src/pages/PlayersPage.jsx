import React, { useEffect, useState } from "react";
import { Trash, SquarePen } from "lucide-react";
import { getPlayers, createPlayer, deletePlayer, updatePlayer } from "../api/players";
import PlayerModal from "../components/playerModal/PlayerModal";
import { useLanguage } from "../context/LanguageContext";

export default function PlayerPage() {
  const { t } = useLanguage()

  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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

  const handleUpdate = async (player) => {
    await updatePlayer(selectedPlayer.id, player);
    loadPlayers();
  };

  const handleDelete = async (playerId) => {
    await deletePlayer(playerId);
    loadPlayers()
  };

  const handleEdit = async (player) => {
    setSelectedPlayer(player);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlayer(null);
  };

  const columns = [
    t("field.firstName"),
    t("field.lastName"),
    t("field.birthdate"),
    t("field.email"),
    t("field.phone"),
    t("field.license"),
    t("common.actions")
  ]

  return (
    <div className="container">
      <h2>{t("player.title")}</h2>

      <button onClick={() => {
        setSelectedPlayer(null);
        setShowModal(true);
      }}>
        {t("player.create")}
      </button>

      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
          <tr>
            <th colSpan={columns.length}><div className="separator" /></th>
          </tr>
        </thead>

        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td>{p.prename}</td>
              <td>{p.lastname}</td>
              <td>{p.birthdate}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.license}</td>
              <td className="button-cell">
                <button className="button-cell-button" onClick={() => handleEdit(p)}>
                  <SquarePen size={18}/>
                </button>
                <button className="button-cell-button" onClick={() => handleDelete(p.id)}>
                  <Trash  size={18}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <PlayerModal
          onClose={closeModal}
          onSave={selectedPlayer ? handleUpdate : handleCreate}
          player={selectedPlayer ?? {
            prename: "",
            lastname: "",
            birthdate: "",
            email: "",
            phone: "",
            license: "",
          }}
        />
      )}
    </div>
  );
}