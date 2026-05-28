import './PurchaseCard.css'
import overlayImage from '../../assets/overlay.svg'
import smileIcon from '../../assets/boxicons_smile.svg'

function PurchaseCard({ amount, imageUrl }) {
    return (
        <div className="purchase-card">
            <div className="purchase-card__price-badge">
                {amount.toLocaleString()}원
            </div>

            <div className="purchase-card__inner">
                <div className="purchase-card__image-wrap">

                    <img
                        src={imageUrl}
                        alt=""
                        className="purchase-card__image"
                    />

                    <img
                        src={overlayImage}
                        alt=""
                        className="purchase-card__overlay"
                    />

                    <div className="purchase-card__info">

                        <p className="purchase-card__time">
                            오전 10:12
                        </p>

                        <div className="purchase-card__category">
                            카페
                        </div>

                        <p className="purchase-card__name">
                            아이스 아메리카노
                        </p>

                        <div className="purchase-card__emotion">
                            <span className="purchase-card__emotion-text">
                                잘샀다
                            </span>
                            <img
                                src={smileIcon}
                                alt=""
                                className="purchase-card__emotion-icon"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PurchaseCard