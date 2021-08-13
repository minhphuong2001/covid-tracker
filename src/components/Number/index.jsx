import React from 'react'
import { Grid } from '@material-ui/core'
import CardNumber from './CardNumber';

export default function Number({ report }) {

    const data = report && report.length ? report[report.length - 1] : []

    const summary = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed,
            type: 'confirmed'
        },
        {
            title: 'Số ca khỏi',
            count: data.Recovered,
            type: 'recovered'
        },
        {
            title: 'Số ca tử vong',
            count: data.Deaths,
            type: 'death'
        },


    ]

    return (
        <div className="data">
            <Grid container spacing={3}>
                {
                    summary.map((item, index) => {
                        return (
                            <Grid item sm={4} xs={12} key={index}>
                                <CardNumber
                                    title={item.title}
                                    count={item.count}
                                    type={item.type}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}
