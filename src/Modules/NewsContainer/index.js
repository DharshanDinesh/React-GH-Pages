import { useEffect, useState } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator as newsActions } from '../../Store/News/news.action';
import MediaCard from '../../Components/Card';
import FilterContainer from '../../Components/FilterIcon';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import TablePagination from '../../Components/Pagination';
function NewsContainer() {
  const dispatch = useDispatch();
  const newsFeed = useSelector((state) => state?.news);
  const articles = newsFeed?.articles;

  const initalRequest = {
    when: '7d',
    countries: 'US',
    topic: 'tech',
    page_size: '10',
    lang: 'en',
    page: '1',
    // sources: 'nytimes.com',
  };
  const [params, setParams] = useState({ ...initalRequest });

  useEffect(() => {
    dispatch(newsActions?.getNewsInformation({ ...params }));
  }, []);

  const getTimeLabel = (date) => {
    function nth(n) {
      return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
    }

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

    return `${monthString} ${dateString}${nth(dateString)} ${yearString}`;
  };

  const getNewsArticles = (values) => {
    let createdParams = values ?? params;
    document.documentElement.scrollTop = 0;
    dispatch(newsActions?.getNewsInformation({ ...createdParams }));
  };
  const constructParams = ({ values }) => {
    const dummyParams = { ...params };
    setParams({ ...dummyParams, ...values });
  };
  return (
    <div className="App">
      <span className="Header_flex">
        <Typography
          variant="h3"
          component="h2"
          style={{ margin: '2% 0.5%', textAlign: 'center', fontWeight: '600', color: '#3399ff' }}
        >
          Latest
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          style={{ margin: '2% 0.5%', textAlign: 'center', fontWeight: '600', color: '#ffffff' }}
        >
          Headlines
        </Typography>
      </span>{' '}
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
                source={news?.rights ?? news?.clean_url}
                date={getTimeLabel(news?.published_date)}
                clean_url={news?.clean_url}
              />
            </div>
          ))}
      </div>
      <div className="NewsContainer">
        {newsFeed?.isSuccess && (
          <TablePagination
            isLoading={newsFeed?.isLoading}
            totalPages={newsFeed?.totalPages}
            currentPage={params?.page - 1}
            rowsPerPage={params?.page_size}
            setParams={setParams}
            params={params}
            getNewsArticles={getNewsArticles}
          />
        )}
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
