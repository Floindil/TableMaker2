import { SquarePlus, Eraser } from "lucide-react";

export default function CreateRow({
  columns,
  draft,
  onChange,
  onCreate,
  onErase,
}) {
  return (
    <tr>
      {columns.map((c) => (
        <td key={c.key}>
          <input
            id={`create-${c.key}`}
            value={draft[c.key] ?? ""}
            onChange={(e) => onChange(c.key, e.target.value)}
            {...(c.ac ? { autoComplete: c.ac } : {})}
            className="create-input"
            placeholder={c.label}
          />
        </td>
      ))}

      <td className="button-cell">
        <button className="button-cell-button" onClick={onCreate}>
          <SquarePlus size={18} />
        </button>

        <button className="button-cell-button" onClick={onErase}>
          <Eraser size={18} />
        </button>
      </td>
    </tr>
  );
}