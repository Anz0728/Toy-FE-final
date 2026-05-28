import FeedHeader from '../components/feed/FeedHeader'
import TodayTitle from '../components/feed/TodayTitle'
import CardGrid from '../components/feed/CardGrid'
import EmotionChart from '../components/feed/EmotionChart'
import WeeklyBarChart from '../components/feed/BarChart'

function Feed() {
    return (
        <div>
            <FeedHeader />
            <div style={{ marginTop: '16px', marginBottom: '51px' }}>
                <TodayTitle total="28,500" />
            </div>
            <div style={{ padding: '0 16px', width: '343px' }}>
                <CardGrid />
            </div>
            <div style={{ padding: '0 16px', marginTop: '32px' }}>
                <EmotionChart />
            </div>
            <div style={{ padding: '0 16px', marginTop: '16px' }}>
                <WeeklyBarChart />
            </div>
        </div>
    )
}

export default Feed