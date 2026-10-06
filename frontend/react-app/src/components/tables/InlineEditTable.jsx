import CreateRow from "./content/CreateRow";
import HeaderRow from "./content/HeaderRow";
import InlineEditRows from "./content/InlineEditRows";

export default function InlineEditTable({
    columns,
    handleCreate,
    items,
    handleSave,
    handleDelete,
    handleInfo,
    handleCancel,
    customAction,
    customSymbol: CustomSymbol,
    showCreateRow = false
}) {
    return (
        <table>
            <thead>
                <HeaderRow columns={columns}/>
            </thead>
            <tbody>
                {handleCreate && showCreateRow && (
                    <CreateRow
                        columns={columns}
                        onCancel={handleCancel}
                        onCreate={handleCreate}
                    />
                )}
                <InlineEditRows
                    items={items}
                    columns={columns}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onInfo={handleInfo}
                    customAction={customAction}
                    customSymbol={CustomSymbol}
                />
            </tbody>
        </table>
    )

}