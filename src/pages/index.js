import { Inter } from 'next/font/google'
import { ArticleCard, Categories, ArticleWidget } from '@/components'
import { getArticles } from '@/services'
const inter = Inter({ subsets: ['latin'] })

export default function Home ({ articles }) {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <head>
        <title>Kundi</title>
        <link rel='icon' href='/favicon.ico' />
      </head>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {articles.map((article) => (
            <ArticleCard article={article} key={article.title} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
            <div className='lg:sticky relative top-8'>
              <ArticleWidget />
              <Categories />
            </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const articles = (await getArticles()) || [];
  return {
    props: { articles }
  }
}
