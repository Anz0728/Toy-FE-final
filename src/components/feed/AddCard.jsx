import './PurchaseCard.css'

function AddCard() {
    return (
        <div className="purchase-card">
            <div className="purchase-card__inner">
                <div className="purchase-card__image-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '32px', color: 'rgba(255,255,255,0.5)' }}>+</span>
                </div>
            </div>
        </div>
    )
}

export default AddCard