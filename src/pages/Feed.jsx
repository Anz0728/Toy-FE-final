import FeedHeader from '../components/feed/FeedHeader'
import TodayTitle from '../components/feed/TodayTitle'
import CardGrid from '../components/feed/CardGrid'
import EmotionChart from '../components/feed/EmotionChart'
import WeeklyBarChart from '../components/feed/BarChart'
import './Feed.css'

function Feed() {
    return (
        <div className="feed-page" style={{
            width: '390px',
            height: '844px',
            backgroundColor: '#FDF7FD',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}>
            <FeedHeader />
            <div style={{ padding: '0 24px' }}>
                <div style={{ marginTop: '16px', marginBottom: '28px' }}>
                    <TodayTitle total="28,500" />
                </div>
                <CardGrid />
                <div style={{ marginTop: '57px' }}>
                    <EmotionChart />
                </div>
                <div style={{ marginTop: '16px', paddingBottom: '70px' }}>
                    <WeeklyBarChart />
                </div>
            </div>
        </div>
    )
}

export default Feed