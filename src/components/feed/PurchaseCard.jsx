import './PurchaseCard.css'
import overlayImage from '../../assets/overlay.svg'
import smileIcon from '../../assets/boxicons_smile.svg'

function PurchaseCard({ amount, imageUrl, itemName, category, emotionTag, createdAt }) {
    const time = createdAt
        ? new Date(createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : ''

    return (
        <div className="purchase-card">
            <div className="purchase-card__price-badge">
                {amount.toLocaleString()}원
            </div>

            <div className="purchase-card__inner">
                <div className="purchase-card__image-wrap">

                    <img src={imageUrl} alt="" className="purchase-card__image" />
                    <img src={overlayImage} alt="" className="purchase-card__overlay" />

                    <div className="purchase-card__info">
                        <p className="purchase-card__time">{time}</p>
                        <div className="purchase-card__category">{category}</div>
                        <p className="purchase-card__name">{itemName}</p>
                        <div className="purchase-card__emotion">
                            <span className="purchase-card__emotion-text">{emotionTag}</span>
                            <img src={smileIcon} alt="" className="purchase-card__emotion-icon" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PurchaseCard