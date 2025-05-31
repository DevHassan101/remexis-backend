"use client";
import AboutSection from "../../components/partials/home/AboutSection";
import ArticlesSection from "../../components/partials/home/ArticlesSection";
import FeatureSection from "../../components/partials/home/FeatureSection";
import HeroSection from "../../components/partials/home/HeroSection";
import FAQSection from "../../components/partials/home/FAQSection";
import { articles } from "../../constants/data";

export default function Home() {
  const articlesArray = articles.slice(0, 4);
  return (
    <section>
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <ArticlesSection array={articlesArray} />
      <FAQSection />
    </section>
  );
}
