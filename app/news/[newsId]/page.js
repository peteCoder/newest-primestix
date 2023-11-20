"use client";

import { getAllNewsExceptId } from "@/actions/getAllNewsExceptId";
import { getDetailNews } from "@/actions/getDetailNews";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import BeatLoader from "react-spinners/BeatLoader";

const NewsPageDetail = () => {
  const [news, setNews] = useState({});
  const [otherNews, setOtherNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const newsId = params.newsId;

  useEffect(() => {
    const fetchDetailNews = async () => {
      try {
        setIsLoading(true);
        const data = await getDetailNews(newsId);
        const otherNewsData = await getAllNewsExceptId(newsId);
        setNews(data[0]);
        setOtherNews(otherNewsData);
        console.log(data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailNews();
  }, [newsId]);

  return (
    <div className="flex items-center justify-center min-h-[500vh] flex-col">
      {isLoading ? (
        <div className="max-w-[970px] lg:max-w-[1170px] mx-auto flex items-center justify-center min-h-[40vh]">
          <BeatLoader color="#e8d5a1b8" />
        </div>
      ) : (
        <div>
          NewsPageDetail {JSON.stringify(news)}
          {/* All the data you need to style here */}
          <div>
            {/* Title */}
            <div>Title: {news?.title}</div>
            <div>Body: {news?.body}</div>
            <div className="flex items-center gap-2">
              Date: <FormattedDate createdAt={news?._createdAt} />
            </div>
            <div>
              Image: {news?.bannerImage?.asset?.url}
              <Image
                width={800}
                height={800}
                alt="banner-image"
                src={news?.bannerImage?.asset?.url}
              />
            </div>
          </div>
        </div>
      )}

      {/* Here are the other news data */}
      <div>
        {/* Other related news data */}
        <h2 className="text-3xl mt-4">Other news</h2>
        <div>
          {otherNews.map((news) => (
            <div key={news._id} className="border border-t mb-5">
              <div>
                {/* Title */}
                <div>Title: {news?.title}</div>
                <div>Body: {news?.body}</div>
                <div className="flex items-center gap-2">
                  Date: <FormattedDate createdAt={news?._createdAt} />
                </div>
                <div>
                  Image: {news?.bannerImage?.asset?.url}
                  <Image
                    width={800}
                    height={800}
                    alt="banner-image"
                    src={news?.bannerImage?.asset?.url}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// You can format the date data however way you like
const FormattedDate = ({ createdAt }) => {
  const date = new Date(createdAt);
  const dateString = date.toString();
  const dateArray = dateString.split(" ");
  const day = dateArray[2];
  const month = dateArray[1];

  return (
    <div>
      <span>{day}</span>
      <span>{month}</span>
    </div>
  );
};

export default NewsPageDetail;
