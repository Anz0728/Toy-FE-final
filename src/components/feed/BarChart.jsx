import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts'
import downIcon from '../../assets/down.svg'
import './BarChart.css'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

function WeeklyBarChart({ report }) {
    const data = report
        ? DAYS.map(day => ({ day, bottom: 40, top: 50 }))
        : DAYS.map(day => ({ day, bottom: 40, top: 50 }))

    return (
        <div className="bar-chart">
            <button className="bar-chart__weekly-btn">
                Weekly
                <img src={downIcon} alt="down" className="bar-chart__down-icon" />
            </button>
            <ResponsiveContainer width="100%" height={188}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                    barSize={10}
                >
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontFamily: 'DM Sans', fontWeight: 400, fontSize: 14, fill: '#8F92A1' }}
                        dy={8}
                    />
                    <Bar dataKey="bottom" stackId="a" fill="#B7A0CA" shape={<CustomBar />} />
                    <Bar dataKey="top" stackId="a" fill="#97AFD5" shape={<CustomBar />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WeeklyBarChart
