import { Container, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import CountrySelector from './components/CountrySelector';
import Number from './components/Number';
import Summary from './components/Summary';
import { sortBy } from 'lodash';
import moment from 'moment';

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [reportByCountry, setReportByCountry] = useState([])

  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get("https://api.covid19api.com/countries")
        const country = sortBy(res.data, 'Country')
        setCountries(country)

        setSelectedCountryId('vn')
      } catch (error) {
        console.log(error.message);
      }
    }
    getCountry();
  }, [])

  const handleChange = (e) => {
    setSelectedCountryId(e.target.value);
  }

  useEffect(() => {
    if (selectedCountryId) {
      const country = countries.find((item) => item.ISO2.toLowerCase() === selectedCountryId)

      const getReportByCountry = async () => {
        try {
          const res = await axios.get(`https://api.covid19api.com/dayone/country/${country.Slug}`)
          res.data.pop();
          setReportByCountry(res.data)
        } catch (error) {
          console.log(error.message);
        }
      }

      getReportByCountry()
    }

  }, [countries, selectedCountryId])

  return (
    <div className="App">
      <Container style={{ marginTop: 20 }}>
        <Typography variant="h2" component="h2">
          Số liệu COVID-19
        </Typography>
        <Typography>
          {moment().format('LLL')}
        </Typography>

        <CountrySelector
          country={countries}
          handleChange={handleChange}
          value={selectedCountryId}
        />
        <Number report={reportByCountry} />
        <Summary report={reportByCountry} />

      </Container>
    </div>
  );
}

export default App;
