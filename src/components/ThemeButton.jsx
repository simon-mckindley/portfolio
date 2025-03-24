import ModeIcon from '../assets/dark_mode.svg';
import LightModeIcon from '../assets/light_mode.svg';

export default function ThemeButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="theme-button"
            title='Toggle dark mode'>
            <img src={ModeIcon} alt="Mode" />
        </button>
    )
}