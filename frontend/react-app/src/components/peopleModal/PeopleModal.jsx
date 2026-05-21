import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";


export default function PlayerModal({ onClose, onSave, player }) {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState(player.prename);
  const [lastName, setLastName] = useState(player.lastname);
  const [birthdate, setBirthdate] = useState(player.birthdate);
  const [email, setEmail] = useState(player.email);
  const [phone, setPhone] = useState(player.phone);
  const [license, setLicense] = useState(player.license);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName) return;

    onSave({
      prename: firstName,
      lastname: lastName,
      birthdate: birthdate,
      email: email,
      phone: phone,
      license: license,
    });

    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>{player.id ? t("player.edit") : t("player.create")}</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder={t("field.firstName")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder={t("field.lastName")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder={t("field.birthdate") + " " + t("field.datePlaceholder")}
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <input
            placeholder={t("field.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder={t("field.phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            placeholder={t("field.license")}
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          />
          <button type="submit">
            {t("common.accept")}
          </button>
          <button type="Button" onClick={onClose}>
            {t("common.cancel")}
          </button>
        </form>
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