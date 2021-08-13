import React from 'react'
import { FormControl, InputLabel, NativeSelect, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    FormControl: {
        margin: theme.spacing(3, 0),
        minWidth: 120
    }
}))

export default function CountrySelector({ country, value, handleChange }) {

    const classes = useStyles();

    return (
        <div className="country-selector">
            <FormControl className={classes.FormControl}>
                <InputLabel shrink htmlFor="country-selector" >Quốc gia</InputLabel>
                <NativeSelect
                    value={value}
                    onChange={handleChange}
                    inputProps={{
                        name: 'conutry',
                        id: 'country-selector'
                    }}
                >
                    {
                        country.map((item, index) => {
                            return (
                                <option key={index} value={item.ISO2.toLowerCase()}>{item.Country}</option>
                            )
                        })
                    }
                    <FormHelperText>Lựa chọn quốc gia</FormHelperText>
                </NativeSelect>
            </FormControl>
        </div>
    )
}
