import CloseIcon from '../assets/close.svg';

export default function FilterItem({ itemName, onFilterClick }) {
    return (
        <div className="filter-item">
            <span>{itemName}</span>
            <button
                type="button"
                title='Remove filter'
                onClick={() => onFilterClick(itemName)} >

                <img src={CloseIcon} alt="X" />
            </button>
        </div>
    );
}