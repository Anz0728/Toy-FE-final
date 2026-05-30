import './PurchaseCard.css'
import overlayImage from '../../assets/overlay.svg'
import smileIcon from '../../assets/boxicons_smile.svg'
import frownIcon from '../../assets/frown.svg'
import { BASE_URL } from '../../utils/api'

const emotionIcons = {
    '잘 샀다': smileIcon,
    '필요해서': smileIcon,
    '기분전환': smileIcon,
    '보상심리': smileIcon,
    '관계/선물': smileIcon,
    '왜 샀지': frownIcon,
    '스트레스': frownIcon,
    '충동구매': frownIcon,
}

function PurchaseCard({ amount, imageUrl, itemName, category, emotionTag, createdAt }) {
    const time = createdAt
        ? new Date(createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : ''

    const emotionIcon = emotionIcons[emotionTag] || smileIcon
    const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`

    return (
        <div className="purchase-card">
            <div className="purchase-card__price-badge">
                {amount}원
            </div>

            <div className="purchase-card__inner">
                <div className="purchase-card__image-wrap">

                    <img src={fullImageUrl} alt="" className="purchase-card__image" />
                    <img src={overlayImage} alt="" className="purchase-card__overlay" />

                    <div className="purchase-card__info">
                        <p className="purchase-card__time">{time}</p>
                        <div className="purchase-card__category">{category}</div>
                        <p className="purchase-card__name">{itemName}</p>
                        <div className="purchase-card__emotion">
                            <span className="purchase-card__emotion-text">{emotionTag}</span>
                            <img src={emotionIcon} alt="" className="purchase-card__emotion-icon" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PurchaseCard