import { PieChart, Pie, Cell } from 'recharts'
import './EmotionChart.css'

const COLORS = ['#E79EA2', '#EFCE77', '#A3C690']

function EmotionChart({ report }) {
    const data = report
        ? Object.values(report.satisfactionRatio).map(value => ({ value }))
        : [{ value: 50 }, { value: 30 }, { value: 20 }]

    return (
        <div className="emotion-chart">
            <h2 className="emotion-chart__title">이번 주 감정 비율</h2>
            <div className="emotion-chart__content">
                <PieChart width={160} height={160}>
                    <Pie
                        data={data}
                        cx={75}
                        cy={75}
                        innerRadius={50}
                        outerRadius={75}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
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