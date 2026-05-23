import {
  Save,
  SquarePen,
  SquareX,
  Trash,
} from "lucide-react";

export default function TableRows({
  items,
  columns,
  editingId,
  draft,
  onDraftChange,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  return (
    <>
      {items.map((i) => {
        const isEditing = editingId === i.id;

        return (
          <tr key={i.id}>
            {columns.map((c) => (
              <td key={c.key}>
                {isEditing ? (
                  <input
                    id={`edit-${i.id}-${c.key}`}
                    value={draft[c.key] ?? ""}
                    onChange={(e) =>
                      onDraftChange(c.key, e.target.value)
                    }
                    {...(c.ac ? { autoComplete: c.ac } : {})}
                  />
                ) : (
                  <span className="table-cell">
                    {i[c.key] || "-"}
                  </span>
                )}
              </td>
            ))}

            <td className="button-cell">
              {isEditing ? (
                <>
                  <button
                    className="button-cell-button"
                    onClick={() => onSave(i.id)}
                  >
                    <Save size={18} />
                  </button>

                  <button
                    className="button-cell-button"
                    onClick={onCancel}
                  >
                    <SquareX size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="button-cell-button"
                    onClick={() => onEdit(i)}
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