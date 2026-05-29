import { useState } from "react";
import { SquarePlus, Eraser } from "lucide-react";

export default function CreateRow({ columns, onCreate }) {
  const [draft, setDraft] = useState({});

  const handleChange = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreate = () => {
    onCreate(draft);
    setDraft({});
  };

  const handleErase = () => {
    setDraft({});
  };

  return (
    <tr>
      {columns.map((c) => (
        <td key={c.key}>
          { c.editable ? (
            <input
              id={`create-${c.key}`}
              value={draft[c.key] ?? ""}
              onChange={(e) => handleChange(c.key, e.target.value)}
              {...(c.ac ? { autoComplete: c.ac } : {})}
              className="create-input"
              placeholder={c.label}
            />
          ) : (
            <div></div>
          )}
        </td>
      ))}

      <td className="button-cell">
        <button className="button-cell-button" onClick={handleCreate}>
          <SquarePlus size={18} />
        </button>

        <button className="button-cell-button" onClick={handleErase}>
          <Eraser size={18} />
        </button>
      </td>
    </tr>
  );
}