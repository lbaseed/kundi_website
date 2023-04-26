import {
  ArticleDetail,
  ArticleWidget,
  Author,
  Categories,
  Comments,
  CommentsForm
} from '@/components'
import { getArticleDetails, getArticles } from '@/services'
import React from 'react'

const ArticleDetails = ({ article }) => {
  console.log(article)
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <ArticleDetail article={article} />
          <Author author={article.user} />
          <CommentsForm slug={article.slug} />
          <Comments slug={article.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='lg:sticky relative top-8'>
            <ArticleWidget
              slug={article.slug}
              categories={article?.categories?.map(category => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails

export async function getStaticProps ({ params }) {
  const data = await getArticleDetails(params.slug)
  return {
    props: { article: data }
  }
}

export async function getStaticPaths () {
  const articles = await getArticles()
  return {
    paths: articles.map(({slug}) => ({ params: { slug } })),
    fallback: false
  }
}
