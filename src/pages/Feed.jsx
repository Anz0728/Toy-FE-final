import { useEffect, useState } from 'react'
import FeedHeader from '../components/feed/FeedHeader'
import TodayTitle from '../components/feed/TodayTitle'
import CardGrid from '../components/feed/CardGrid'
import EmotionChart from '../components/feed/EmotionChart'
import WeeklyBarChart from '../components/feed/BarChart'
import { fetchWithGuest } from '../utils/api'
import './Feed.css'

function Feed() {
    const [totalAmount, setTotalAmount] = useState(0)
    const [report, setReport] = useState(null)

    useEffect(() => {
        fetchWithGuest('http://localhost:8080/api/spendings/todays')
            .then(res => res.json())
            .then(data => setTotalAmount(data.data.totalAmount))

        fetchWithGuest('http://localhost:8080/api/report')
            .then(res => res.json())
            .then(data => setReport(data.data))
    }, [])

    return (
        <div className="feed-page">
            <FeedHeader />
            <div className="feed-page__inner">
                <div className="feed-page__today">
                    <TodayTitle total={totalAmount.toLocaleString()} />
                </div>
                <CardGrid />
                <div className="feed-page__emotion">
                    <EmotionChart report={report} />
                </div>
                <div className="feed-page__barchart">
                    <WeeklyBarChart report={report} />
                </div>
            </div>
        </div>
    )
}

export default Feed
