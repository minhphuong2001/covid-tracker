import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import LineChart from '../Charts/LineChart'
import HighMap from '../Charts/HighMap'

export default function Summary({ report, countryId }) {

    const [mapData, setMapData] = useState({})

    useEffect(() => {
        if (countryId) {
            import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`)
            .then((res) => setMapData(res))
        }
    }, [countryId])

    return (
        <div className="summary">
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMap mapData={ mapData }/>
                </Grid>
            </Grid>
        </div>
    )
}
