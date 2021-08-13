import React, { useEffect, useRef, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import highchartsMap from 'highcharts/modules/map'
import {cloneDeep} from 'lodash'

highchartsMap(Highcharts);

const initOptions = {
    chart: {
        height: 500
    },
    title: {
        text: null
    },
    mapNavigation: {
        enabled: true
    },
    colorAxis: {
        min: 1,
        // minColor: '#EEEEFF',
        // maxColor: '#000022',
        stops: [
            [0, '#EFEFFF'],
            [0.2, '#4444FF'],
            [0.8, '#3742fa'],
            [0.6, '#1e3799'],
            [1, '#000022']
        ]
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom'
    },
    series: [
        {
            mapData: {},
            name: 'Dân số',
            joinBy: ['hc-key', 'key']
        }
    ]
}

export default function HighMap({mapData}) {
    const [options, setOptions] = useState({});
    const chartRef = useRef(null)
    const [configLoading, setConfigLoading] = useState(false)
    
    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            const fakeData = mapData.features.map((item, index) => ({
                key: item.properties['hc-key'],
                value: index
            }));

            setOptions({
                ...initOptions,
                series: [
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: fakeData
                    }
                ]
            })

            if (configLoading) {
                setConfigLoading(true)
            }
        }
        
    }, [mapData, configLoading])
    
    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData: mapData
            })
        }
    }, [mapData])

    if (!configLoading) return null;

    return (
        <div className="map">
            <HighchartsReact
                highcharts={Highcharts}
                options={ cloneDeep(options) }
                constructorType={'mapChart'}
                ref={chartRef}
            />
        </div>
    )
}
