import './CardGrid.css'
import PurchaseCard from './PurchaseCard'
import AddCard from './AddCard'
import testImage from '../../assets/Eximg.png'

function CardGrid() {
    return (
        <div className="card-grid">
            <PurchaseCard amount={4500} imageUrl={testImage} />
            <PurchaseCard amount={6000} imageUrl={testImage} />
            <PurchaseCard amount={18000} imageUrl={testImage} />
            <AddCard />
        </div>
    )
}

export default CardGrid