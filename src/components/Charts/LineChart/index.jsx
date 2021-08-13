import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import { Button, ButtonGroup } from '@material-ui/core'

const generateOption = (data) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'))

    return {
        chart: {
            height: 500,
        },
        title: {
            text: 'Number of cases'
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        colors: ['#0fb9b1'],
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            labels: {
                align: 'right'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Tổng số ca nhiễm',
                data: data.map((item) => item.Confirmed)
            }
        ]
    }
}

export default function LineChart({ data }) {
    const [options, setOptions] = useState({})
    const [reportStyle, setReportStyle] = useState('all')

    useEffect(() => {
        let customData = []
        switch (reportStyle) {
            case 'all':
                customData = data
                break;
            case '30':
                customData = data.slice(Math.max(data.length - 30, 1))
                break;
            case '7':
                customData = data.slice(Math.max(data.length - 7, 1))
                break;
            default:
                customData = data;
                break
        }

        setOptions(generateOption(customData))
    }, [data, reportStyle])

    return (
        <div className="line-chart">
            <ButtonGroup
                size='small'
                aria-label="small outlined button group"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    color={reportStyle === 'all' ? 'secondary' : ''}
                    onClick={() => setReportStyle('all')}
                >
                    Tất cả
                </Button>
                <Button
                    color={reportStyle === '30' ? 'secondary' : ''}
                    onClick={() => setReportStyle('30')}
                >
                    30 ngày
                </Button>
                <Button
                    color={reportStyle === '7' ? 'secondary' : ''}
                    onClick={() => setReportStyle('7')}
                >
                    7 ngày
                </Button>
            </ButtonGroup>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}
