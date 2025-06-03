import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Article Image */}
      <div className="relative h-48 w-full">
        <Image
          src={article.banner}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="p-6 leading-[183%]">
        <h3 className="text-lg font-semibold text-[#141414] mb-2.5 leading-[100%]">
          {article.title}
        </h3>
        <p className="text-[#868383] text-sm sm:text-[14px] mb-2.5">
          {article.excerpt}
        </p>

        {/* Read More Link */}
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <Link
            href={`/articles/${article.id}`}
            className="text-[#ffa902] text-sm underline"
          >
            Read more
          </Link>
          <span className="text-[#696969]">by </span>
          <span className="text-[#141414]">{article.author}</span>
        </div>
      </div>
    </div>
  );
}
