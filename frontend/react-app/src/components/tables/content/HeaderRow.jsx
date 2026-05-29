import { useLanguage } from "../../../context/LanguageContext"

export default function HeaderRow({
  columns
}) {
  const { t } = useLanguage()
  return (
    <>
      <tr>
        {columns.map((c) => (
          <th key={c.key}>{c.label}</th>
        ))}
        <th>{t("common.actions")}</th>
      </tr>
      <tr>
        <th colSpan={columns.length + 1}>
          <div className="separator" />
        </th>
      </tr>
    </>
  )
}