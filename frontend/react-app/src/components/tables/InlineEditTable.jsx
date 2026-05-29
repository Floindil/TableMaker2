import CreateRow from "./content/CreateRow";
import HeaderRow from "./content/HeaderRow";
import InlineEditRows from "./content/InlineEditRows";

export default function InlineEditTable({
    columns,
    handleCreate,
    items,
    handleSave,
    handleDelete,
    handleInfo
}) {
    return (
        <table>
            <thead>
                <HeaderRow columns={columns}/>
            </thead>
            <tbody>
                <CreateRow
                    columns={columns}
                    onCreate={handleCreate}
                />
                <InlineEditRows
                    items={items}
                    columns={columns}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onInfo={handleInfo}
                />
            </tbody>
        </table>
    )
}