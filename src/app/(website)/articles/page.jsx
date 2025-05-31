"use client";
import ArticlesSection from "../../components/partials/home/ArticlesSection";
import TopSection from "../../components/ui/TopSection";
import { articles } from "../../constants/data";

export default function Articles() {
  return (
    <section className="bg-white pt-6 px-5">
      <TopSection top={"Articles"} />

      <div className="bg-white">
        <ArticlesSection array={articles} />
      </div>
    </section>
  );
}
