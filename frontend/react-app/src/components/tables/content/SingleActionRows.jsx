import { useState } from "react";
import { getValue } from "./columnDefinitions";

export default function SingleActionRows({
  items,
  columns,
  action,
  symbol: Symbol
}) {
  return (
    <>
      {items.map((i) => {
        return (
          <tr key={i.id}>
            <td>
              <button
                className="button-cell-button"
                onClick={() => action(i.id)}
                >
                <Symbol size={18} />
              </button>
            </td>
            {columns.map((c) => (
              <td key={c.key}>
                <span className="table-cell">
                  {getValue(i,c.key) || "-"}
                </span>
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );
}