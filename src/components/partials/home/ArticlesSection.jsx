import ArticleCard from "../cards/ArticleCard";

export default function ArticlesSection({ array }) {
  // Sample article data - in a real app, this would come from an API or CMS

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-3xl lg:text-4xl lg:leading-[40px] xl:text-[2.513rem] 2xl:text-[46px] font-medium 2xl:leading-[100%] text-gray-800 mb-4">
            Our Articles
          </h2>
          <p className="text-[#64647c] text-base md:text-lg md:text-[22px] max-w-[861px] mx-auto">
            Explore concise, evidence-based articles on herbs, supplements, and
            integrative health—regularly updated to keep clinicians informed and
            inspired.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {array.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
