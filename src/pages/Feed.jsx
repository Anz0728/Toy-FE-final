import { useEffect, useState } from 'react'
import FeedHeader from '../components/feed/FeedHeader'
import TodayTitle from '../components/feed/TodayTitle'
import CardGrid from '../components/feed/CardGrid'
import EmotionChart from '../components/feed/EmotionChart'
import WeeklyBarChart from '../components/feed/BarChart'
import { api } from '../utils/api'
import './Feed.css'

function Feed() {
    const [totalAmount, setTotalAmount] = useState(0)
    const [report, setReport] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const todaysData = await api.getTodaysSpendings();
                setTotalAmount(todaysData.totalAmount);

                const reportData = await api.getReport();
                setReport(reportData);
            } catch (e) {
                console.error('Failed to load feed data', e);
            }
        };
        loadData();
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
