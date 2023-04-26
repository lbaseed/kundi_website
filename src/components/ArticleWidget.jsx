import React, { useEffect, useState } from "react"
import moment from "moment"
import Link from "next/link"
import { getRecentArticles, getSimilarArticles } from "@/services"

const ArticleWidget = ({ categories, slug }) => {
  const [relatedArticles, setRelatedArticles] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarArticles(categories, slug).then((result) =>
        setRelatedArticles(result)
      )
    } else {
      getRecentArticles().then((result) => setRelatedArticles(result))
    }
  }, [slug])
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Post" : "Recent Post"}
      </h3>
      {relatedArticles?.map((article) => (
        <div key={article.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={article.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={article.featured_image}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(article.created_at).format("MMM DD, YYYY")}
            </p>
            <Link href={`/article/${article.slug}`} className="text-md">
              {article.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleWidget
