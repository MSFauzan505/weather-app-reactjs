import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const ForecastChart = ({data}) => {
  return (
    <ResponsiveContainer>
        <LineChart data={data}>
            <XAxis dataKey='time' tick={{ fill: '#ffffff' }}/>
            <YAxis unit="°C" tick={{ fill: '#ffffff' }}/>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937' }}
    labelStyle={{ color: '#93c5fd' }}
    itemStyle={{ color: '#facc15' }}
            />
            <Line type="natural" dataKey={'temp'} stroke='#466ef2' strokeWidth={2}/>
        </LineChart>
    </ResponsiveContainer>
  )
}

export default ForecastChart