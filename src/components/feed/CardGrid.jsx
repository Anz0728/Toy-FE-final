import { useEffect, useState } from 'react'
import './CardGrid.css'
import PurchaseCard from './PurchaseCard'
import AddCard from './AddCard'
import { fetchWithGuest } from '../../utils/api'

function CardGrid() {
    const [spendings, setSpendings] = useState([])

    useEffect(() => {
        fetchWithGuest('http://localhost:8080/api/spendings/todays')
            .then(res => res.json())
            .then(data => setSpendings(data.spendings))
    }, [])

    return (
        <div className="card-grid">
            {spendings.map(item => (
                <PurchaseCard
                    key={item.id}
                    amount={item.amount}
                    imageUrl={item.imageUrl}
                    itemName={item.itemName}
                    category={item.category}
                    emotionTag={item.emotionTag}
                    createdAt={item.createdAt}
                />
            ))}
            <AddCard />
        </div>
    )
}

export default CardGrid