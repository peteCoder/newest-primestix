"use client";

import { getDetailNews } from "@/actions/getDetailNews";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewsPageDetail = () => {
  const [news, setNews] = useState({});
  const params = useParams();

  const newsId = params.newsId;

  useEffect(() => {
    const fetchDetailNews = async () => {
      const data = await getDetailNews(newsId);
      setNews(data[0]);
      console.log(data[0]);
    };

    fetchDetailNews();
  }, [newsId]);

  return (
    <div className="flex items-center justify-center">
      NewsPageDetail {JSON.stringify(news)}
    </div>
  );
};

export default NewsPageDetail;
