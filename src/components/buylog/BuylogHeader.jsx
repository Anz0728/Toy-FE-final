import CircleIcon from '../../assets/Circle.svg';
import SettingIcon from '../../assets/Setting2.svg';
import './BuylogHeader.css';

function BuylogHeader() {
    return (
        <header className="buylog-header">
            <span className="buylog-header__logo">Buylog</span>
            <div className="buylog-header__icon-wrapper">
                <img src={CircleIcon} alt="" className="buylog-header__circle" />
                <img src={SettingIcon} alt="설정" className="buylog-header__gear" />
            </div>
        </header>
    );
}

export default BuylogHeader;
