import React from 'react'
import { Grid } from '@material-ui/core'
import LineChart from '../Charts/LineChart'

export default function Summary({ report }) {

    return (
        <div className="summary">
            <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                    <LineChart data={report} />
                </Grid>
            </Grid>
        </div>
    )
}
