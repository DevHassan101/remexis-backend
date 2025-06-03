"use client";
import { useEffect, useState } from "react";
import ArticlesSection from "../../../components/partials/home/ArticlesSection";
import TopSection from "../../../components/ui/TopSection";
import { articles } from "../../../constants/data";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    let response = await fetch('api/web/article', {
      method: "GET"
    });
    if (response.ok) {
      let data = await response.json();
      setArticles(data.articles)
    }

    // console.log(response);
    
  }
  useEffect(() => {
  fetchArticles();
  })
  return (
    <section className="bg-white pt-6 px-5">
      <TopSection top={"Articles"} />

      <div className="bg-white">
        <ArticlesSection array={articles} />
      </div>
    </section>
  );
}
