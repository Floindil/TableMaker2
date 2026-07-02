import {
  Info,
  Save,
  SquarePen,
  SquareX,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { getValue } from "./columnDefinitions";

export default function InlineEditRows({
  items,
  columns,
  onSave,
  onDelete,
  onInfo
}) {
  const [draft, setDraft] = useState({});
  const [editingId, setEditingId] = useState(null);

  const handleChange = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setDraft({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraft({});
  };

  const handleSave = async (itemId) => {
    await onSave(itemId, draft);
    setEditingId(null);
    setDraft({});
  };

  const handleInfo = async (itemId) => {
    await onInfo(itemId)
  };

  return (
    <>
      {items.map((i) => {
        const isEditing = editingId === i.id;

        return (
          <tr key={i.id}>
            {columns.map((c) => (
              <td key={c.key}>
                {isEditing && c.editable !== false ? (
                  <input
                    id={`edit-${i.id}-${c.key}`}
                    value={getValue(draft,c.key) ?? ""}
                    onChange={(e) => handleChange(c.key, e.target.value)}
                    {...(c.ac ? { autoComplete: c.ac } : {})}
                  />
                ) : (
                  <span className="table-cell">
                    {getValue(i,c.key) || "-"}
                  </span>
                )}
              </td>
            ))}

            <td className="button-cell">
              <button
                className="button-cell-button"
                onClick={() => handleInfo(i.id)}
              >
                <Info size={18} />
              </button>
              {isEditing ? (
                <>
                  <button
                    className="button-cell-button"
                    onClick={() => handleSave(i.id)}
                  >
                    <Save size={18} />
                  </button>

                  <button
                    className="button-cell-button"
                    onClick={handleCancel}
                  >
                    <SquareX size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="button-cell-button"
                    onClick={() => handleEdit(i)}
                  >
                    <SquarePen size={18} />
                  </button>

                  <button
                    className="button-cell-button"
                    onClick={() => onDelete(i.id)}
                  >
                    <Trash size={18} color="red" />
                  </button>
                </>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}