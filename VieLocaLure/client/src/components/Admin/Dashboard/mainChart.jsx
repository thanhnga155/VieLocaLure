import React, { useEffect, useRef } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const revenueSample = [
	{"timeline": "January", "revenue": 30000, "profit": 24000},
    {"timeline": "February", "revenue": 50000, "profit": 30000},
    {"timeline": "March", "revenue": 41000, "profit": 36000},
    {"timeline": "April", "revenue": 27000, "profit": 26000},
    {"timeline": "May", "revenue": 35000, "profit": 34000},
    {"timeline": "June", "revenue": 41000, "profit": 32000},
    {"timeline": "July", "revenue": 42000, "profit": 38000},
    {"timeline": "August", "revenue": 45000, "profit": 40000},
    {"timeline": "September", "revenue": 25000, "profit": 22000},
    {"timeline": "October", "revenue": 31000, "profit": 28000},
    {"timeline": "November", "revenue": 31000, "profit": 25000},
    {"timeline": "December", "revenue": 40000, "profit": 31000}
]

const MainChart = ({profitStat}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        document.documentElement.addEventListener('ColorSchemeChange', () => {
            if (chartRef.current) {
                setTimeout(() => {
                    chartRef.current.options.scales.x.grid.borderColor = getStyle(
                        '--cui-border-color-translucent',
                    )
                    chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
                    chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
                    chartRef.current.options.scales.y.grid.borderColor = getStyle(
                        '--cui-border-color-translucent',
                    )
                    chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
                    chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
                    chartRef.current.update()
                })
            }
        })
    }, [chartRef])


  return (
    profitStat.length !== 0 &&
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '350px', marginTop: '40px' }}
        data={{
            labels: profitStat.map(data => data.timeline),
            datasets: [
                {
                    label: 'Profit',
                    backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
                    borderColor: getStyle('--cui-info'),
                    pointHoverBackgroundColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: profitStat.map(data => data.profit),
                    fill: true,
                },
                {
                    label: 'Revenue',
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--cui-success'),
                    pointHoverBackgroundColor: getStyle('--cui-success'),
                    borderWidth: 2,
                    data: profitStat.map(data => data.revenue),
                },
            ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
                beginAtZero: true,
                border: {
                    color: getStyle('--cui-border-color-translucent'),
                },
                grid: {
                    color: getStyle('--cui-border-color-translucent'),
                },
                max: Math.max(profitStat.map(data => data.revenue)),
                ticks: {
                    color: getStyle('--cui-body-color'),
                    maxTicksLimit: 5000,
                    stepSize: Math.ceil(Math.max(profitStat.map(data => data.revenue)) / 5000),
                },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart