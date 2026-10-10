import { ICON_SIZES } from "../../config";

export default function TitleWithActions({
    title,
    actions = []
}) {
    return (
        <div className="flex-container">
            <h2>{title}</h2>
            {
                actions.map(({ icon: Icon, onClick}, index) =>(
                    <button
                        key={index}
                        type="button"
                        className="button-cell-button"
                        onClick={onClick}
                    >
                        <Icon size={ICON_SIZES.medium} />
                    </button>
                ))
            }
        </div>
    )
}
