import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as newsActions } from "../src/Store/News/news.action";
import MediaCard from "./Components/Card";

function App() {
  const dispatch = useDispatch();
  const newsFeed = useSelector((state) => state?.news);
  const articles = newsFeed?.articles;

  const initalRequest = {
    pageSize: 100,
    q: "",
    country: "us",
    category: "business",
  };
  const [params, setParams] = useState({ ...initalRequest });

  useEffect(() => {
    dispatch(newsActions?.getNewsInformation({ ...params }));
  }, []);

  const getTimeLabel = (date) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dummyDate = new Date(date);
    let monthString = month[dummyDate?.getMonth()];
    let dateString = dummyDate?.getDate();
    let yearString = dummyDate?.getFullYear();

    return `${monthString} ${dateString} ${yearString}`;
  };
  return (
    <div className="App">
      <div className="NewsContainer">
        {newsFeed?.isSuccess &&
          articles?.map((news, index) => (
            <div className="NewsCard" key={index}>
              <MediaCard
                imageUrl={news?.urlToImage}
                title={news?.title}
                description={news?.description}
                sourceUrl={news?.url}
                soruce={news?.source?.name}
                date={getTimeLabel(news?.publishedAt)}
              />
            </div>
          ))}
        {newsFeed?.isLoading &&
          [...Array(10).keys()]?.map((key) => (
            <div className="NewsCard" key={key}>
              <MediaCard isLoading={true} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
