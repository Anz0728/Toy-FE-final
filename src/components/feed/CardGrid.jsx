import { useEffect, useState } from 'react'
import './CardGrid.css'
import PurchaseCard from './PurchaseCard'
import AddCard from './AddCard'
import { api } from '../../utils/api'

function CardGrid() {
    const [spendings, setSpendings] = useState([])

    useEffect(() => {
        const loadSpendings = async () => {
            try {
                const data = await api.getTodaysSpendings();
                setSpendings(data.spendings);
            } catch (e) {
                console.error('Failed to load spendings', e);
            }
        };
        loadSpendings();
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