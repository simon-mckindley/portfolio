import CloseIcon from '../assets/close.svg';

export default function FilterItem({ itemName, onFilterClick }) {
    return (
        <div className="filter-item">
            <span>{itemName}</span>
            <img
                src={CloseIcon}
                id={itemName}
                onClick={() => onFilterClick(itemName)}
                alt="X"
                title='Remove filter'
            />
        </div>
    );
}