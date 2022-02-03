import { useEffect, useState } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator as newsActions } from '../../Store/News/news.action';
import MediaCard from '../../Components/Card';
import FilterContainer from '../../Components/FilterIcon';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function NewsContainer() {
  const dispatch = useDispatch();
  const newsFeed = useSelector((state) => state?.news);
  const articles = newsFeed?.articles;

  const initalRequest = {
    when: '7d',
    countries: 'US',
    topic: 'tech',
    page_size: '100',
    lang: 'en',
    // sources: 'nytimes.com',
  };
  const [params, setParams] = useState({ ...initalRequest });

  useEffect(() => {
    dispatch(newsActions?.getNewsInformation({ ...params }));
  }, []);

  const getTimeLabel = (date) => {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dummyDate = new Date(date);
    let monthString = month[dummyDate?.getMonth()];
    let dateString = dummyDate?.getDate();
    let yearString = dummyDate?.getFullYear();

    return `${monthString} ${dateString} ${yearString}`;
  };

  const getNewsArticles = () => {
    dispatch(newsActions?.getNewsInformation({ ...params }));
  };

  const constructParams = ({ values }) => {
    const dummyParams = { ...params };
    setParams({ ...dummyParams, ...values });
  };
  return (
    <div className="App">
      <FilterContainer
        setParams={constructParams}
        getNewsArticles={getNewsArticles}
        params={params}
      />

      <div className="NewsContainer">
        {newsFeed?.isSuccess &&
          articles?.map((news, index) => (
            <div className="NewsCard" key={index}>
              <MediaCard
                imageUrl={news?.media}
                title={news?.title}
                description={news?.summary}
                sourceUrl={news?.link}
                soruce={news?.rights ?? news?.clean_url}
                date={getTimeLabel(news?.published_date)}
              />
            </div>
          ))}
        {newsFeed?.isLoading &&
          [...Array(10).keys()]?.map((key) => (
            <div className="NewsCard" key={key}>
              <MediaCard isLoading={true} />
            </div>
          ))}

        {newsFeed?.isFailure && (
          <Alert severity="info">
            <AlertTitle>Please change the filter !</AlertTitle>
            No News are found with given filter condition
            <strong> </strong>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default NewsContainer;
