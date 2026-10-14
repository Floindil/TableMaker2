import CreateRow from "./content/CreateRow";
import HeaderRow from "./content/HeaderRow";
import InlineEditRows from "./content/InlineEditRows";

export default function InlineEditTable({
    columns,
    items,
    itemHandling: {
        handleCreate,
        handleSave,
        handleDelete,
        handleInfo,
        handleUnlink,
        handleCancel
    },
    showCreateRow = false
}) {
    const lineItemHandling = {
        onSave: handleSave,
        onDelete: handleDelete,
        onInfo: handleInfo,
        onUnlink: handleUnlink,
    };
    
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
                    itemHandling={lineItemHandling}
                />
            </tbody>
        </table>
    )

}