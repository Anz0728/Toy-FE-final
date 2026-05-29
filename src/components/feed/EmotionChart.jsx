import { PieChart, Pie, Cell } from 'recharts'
import './EmotionChart.css'

const data = [
    { value: 50 },
    { value: 30 },
    { value: 20 },
]

const COLORS = ['#E79EA2', '#EFCE77', '#A3C690']

function EmotionChart() {
    return (
        <div className="emotion-chart">
            <h2 className="emotion-chart__title">이번 주 감정 비율</h2>
            <div className="emotion-chart__content">
                <PieChart width={139} height={138}>
                    <Pie
                        data={data}
                        cx={64}
                        cy={64}
                        innerRadius={50}
                        outerRadius={62}
                        dataKey="value"
                        strokeWidth={0}
                        paddingAngle={0}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
                <div className="emotion-chart__legend">
                    <span style={{ background: '#EFCE77' }} />
                    <span style={{ background: '#A3C690' }} />
                    <span style={{ background: '#E79EA2' }} />
                </div>
            </div>
        </div>
    )
}

export default EmotionChart