import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import '../../App.css';
function FilterContainer({ setParams, getNewsArticles, params }) {
  const [publishedBefore, setPublishedBefore] = useState([
    { name: '7 Days', value: '7d', isSelected: true },
    { name: '14 Days', value: '14d', isSelected: false },
  ]);
  const [countries, setCountry] = useState([
    { name: 'USA', value: 'US', isSelected: true },
    { name: 'India', value: 'IN', isSelected: false },
    { name: 'UK', value: 'gb', isSelected: false },
  ]);
  const [topics, setTopics] = useState([
    { name: 'Technology', value: 'tech', isSelected: true },
    { name: 'Business', value: 'business', isSelected: false },
    { name: 'Entertainment', value: 'entertainment', isSelected: false },
    { name: 'Sport', value: 'sport', isSelected: false },
  ]);
  const [langauge, setLangauge] = useState([
    { name: 'English', value: 'en', isSelected: true },
    { name: 'French', value: 'fr', isSelected: false },
    { name: 'Tamil', value: 'ta', isSelected: false },
    { name: 'Telugu', value: 'te', isSelected: false },
  ]);

  const handlePublishedBefore = (id) => {
    const days = [...publishedBefore];
    days?.map((day, index) => {
      return (day.isSelected = id === index ? true : false);
    });
    setPublishedBefore([...days]);
    setParams({ values: { when: days[id]['value'] } });
  };
  const handleCountry = (id) => {
    const data = [...countries];
    data?.map((day, index) => {
      return (day.isSelected = id === index ? true : false);
    });
    setCountry([...data]);
    setParams({ values: { countries: data[id]['value'] } });
  };
  const handleTopics = (id) => {
    const data = [...topics];
    data?.map((day, index) => {
      return (day.isSelected = id === index ? true : false);
    });
    setTopics([...data]);
    setParams({ values: { topic: data[id]['value'] } });
  };
  const handleLanguage = (id) => {
    const data = [...langauge];
    data?.map((day, index) => {
      return (day.isSelected = id === index ? true : false);
    });
    setLangauge([...data]);
    setParams({ values: { lang: data[id]['value'] } });
  };

  return (
    <div className="filterGrid">
      <span className="Header_flex">
        <Typography
          variant="h4"
          component="h2"
          style={{ margin: '0% 3%', textAlign: 'center', fontWeight: '600', color: '#3399ff' }}
        >
          Filter
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          style={{ textAlign: 'center', fontWeight: '600', color: '#071a2f' }}
        >
          Based On
        </Typography>
      </span>{' '}
      <div className="filterGrid">
        <Typography variant="subtitle1" component="h2" style={{ margin: '3% 0%' }}>
          Published Before{' '}
        </Typography>
        <ButtonGroup color="primary" aria-label="medium secondary button group">
          {publishedBefore?.map((day, index) => (
            <Button
              key={index + 'days'}
              variant={
                params?.when && day?.value === params?.when
                  ? 'contained'
                  : day?.isSelected && !params?.when
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                handlePublishedBefore(index);
              }}
            >
              {day?.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="filterGrid">
        <Typography variant="subtitle1" component="h2" style={{ margin: '3% 0%' }}>
          Country
        </Typography>
        <ButtonGroup color="primary" aria-label="medium secondary button group">
          {countries?.map((day, index) => (
            <Button
              key={index + 'countries'}
              variant={
                params?.countries && day?.value === params?.countries
                  ? 'contained'
                  : day?.isSelected && !params?.countries
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                handleCountry(index);
              }}
            >
              {day?.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="filterGrid">
        <Typography
          variant="subtitle1"
          component="h2"
          className="fiterHeading"
          style={{ margin: '3% 0%' }}
        >
          Topic
        </Typography>
        <ButtonGroup color="primary" size="small" aria-label="medium secondary button group">
          {topics?.map((day, index) => (
            <Button
              key={index + 'topics'}
              variant={
                params?.topic && day?.value === params?.topic
                  ? 'contained'
                  : day?.isSelected && !params?.topic
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                handleTopics(index);
              }}
            >
              {day?.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="filterGrid" style={{ margin: '0% 0% 16% 0%' }}>
        <Typography variant="subtitle1" component="h2" style={{ margin: '3% 0%' }}>
          Langauge
        </Typography>
        <ButtonGroup color="primary" aria-label="small button group">
          {langauge?.map((day, index) => (
            <Button
              key={index + 'language'}
              variant={
                params?.lang && day?.value === params?.lang
                  ? 'contained'
                  : day?.isSelected && !params?.lang
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                handleLanguage(index);
              }}
            >
              {day?.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="filterGrid">
        <Button variant="contained" onClick={() => getNewsArticles()} size="large" color="success">
          Apply &#38; Close
        </Button>
      </div>
    </div>
  );
}
export default FilterContainer;
