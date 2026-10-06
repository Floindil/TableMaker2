import HeaderRow from "./content/HeaderRow";
import SingleActionRows from "./content/SingleActionRows";

export default function SingleActionTable({
    columns,
    items,
    action,
    symbol
}) {
    return (
        <table>
            <thead>
                <HeaderRow columns={columns}/>
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