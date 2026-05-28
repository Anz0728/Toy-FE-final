import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts'
import './BarChart.css'

const data = [
    { day: 'Mon', bottom: 40, top: 50 },
    { day: 'Tue', bottom: 50, top: 40 },
    { day: 'Wed', bottom: 30, top: 60 },
    { day: 'Thu', bottom: 80, top: 10 },
    { day: 'Fri', bottom: 40, top: 50 },
    { day: 'Sat', bottom: 65, top: 25 },
    { day: 'Sun', bottom: 55, top: 35 },
]

const CustomBar = (props) => {
    const { x, y, width, height, fill } = props
    if (!width || !height) return null

    const radius = 6
    const gap = 8
    const adjustedHeight = Math.max(height - gap / 2, radius * 2)
    const adjustedY = fill === '#B7A0CA' ? y + gap / 2 : y

    return (
        <g>
            <rect
                x={x}
                y={adjustedY}
                width={width}
                height={adjustedHeight}
                rx={radius}
                ry={radius}
                fill={fill}
            />
        </g>
    )
}

function WeeklyBarChart() {
    return (
        <div className="bar-chart">
            <button className="bar-chart__weekly-btn">Weekly ▾</button>
            <ResponsiveContainer width="100%" height={188}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                    barSize={10}
                >
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <Bar dataKey="bottom" stackId="a" fill="#B7A0CA" shape={<CustomBar />} />
                    <Bar dataKey="top" stackId="a" fill="#97AFD5" shape={<CustomBar />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WeeklyBarChart