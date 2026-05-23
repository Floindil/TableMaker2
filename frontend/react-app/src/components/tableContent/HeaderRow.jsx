export default function HeaderRow({
  columns,
  actionsLabel
}) {
    return (
        <>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th>{actionsLabel}</th>
          </tr>

          <tr>
            <th colSpan={columns.length + 1}>
              <div className="separator" />
            </th>
          </tr>
        </>
    )
}