import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import CountUp from 'react-countup'
const useStyles = makeStyles({
    wrapper: (props) => {
        if (props.type === 'confirmed') return { borderLeft: '5px solid #e74c3c' }
        if (props.type === 'recovered') return { borderLeft: '5px solid #27ae60' }
        else return { borderLeft: '5px solid #2c3e50' }
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    count: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default function CardNumber({ title, count, type }) {
    const classes = useStyles({ type });

    return (
        <div>
            <Card className={classes.wrapper}>
                <CardContent>
                    <Typography className={classes.title} variant="body2" component="p">
                        {title}
                    </Typography>
                    <Typography className={classes.count} variant="body2" component="span">
                        <CountUp
                            end={count}
                            duration={2}
                            separator=' '
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
