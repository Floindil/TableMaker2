import HeaderRow from "./content/HeaderRow";
import SingleActionRows from "./content/SingleActionRows";

export default function SingleActionTable({
    columns,
    items,
    action,
    symbol
}) {
    const headerColumns = [{key:"placeholder"}, ...columns]
    return (
        <table>
            <thead>
                <HeaderRow columns={headerColumns}/>
            </thead>
            <tbody>
                <SingleActionRows
                    items={items}
                    columns={columns}
                    action={action}
                    symbol={symbol}
                />
            </tbody>
        </table>
    )

}