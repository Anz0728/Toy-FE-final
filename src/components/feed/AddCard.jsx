import { useNavigate } from 'react-router-dom'
import overlayImage from '../../assets/overlay.svg'
import crossIcon from '../../assets/cross.svg'
import './PurchaseCard.css'
import './AddCard.css'

function AddCard() {
    const navigate = useNavigate()

    return (
        <div className="purchase-card add-card" onClick={() => navigate('/buylog')}>
            <div className="purchase-card__price-badge">
            </div>
            <div className="purchase-card__inner">
                <div className="purchase-card__image-wrap add-card__image-wrap">
                    <img src={overlayImage} alt="" className="purchase-card__overlay" />
                    <img src={crossIcon} alt="추가" className="add-card__cross-icon" />
                </div>
            </div>
        </div>
    )
}

export default AddCard
