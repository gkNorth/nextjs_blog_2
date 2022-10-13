import { getArticles } from '../libs/getArticles';
import Card from '../components/Card'
import type { GetStaticProps } from 'next'
import type { Article } from '../types/article';
import { useState, useCallback, useEffect } from "react";
import Image from 'next/image'

type Props = {
  articles: Article[]
  totalCount: number
}

export default function Home({ articles, totalCount }: Props) {
  const [stateArticles, setStateArticles] = useState<Article[]>(articles)
  const [isMoreArticles, setIsMoreArticles] = useState(true)
  const getMoreArticles = async () => {
    if (stateArticles.length < totalCount) {
      const listBottom = document.querySelector('.list').getBoundingClientRect().bottom
      const vh = window.innerHeight
      if (listBottom < vh * 0.9) {
        const moreArticlesContainer: Article[] = await getArticles(stateArticles.length)
        const moreArticles = moreArticlesContainer.contents
        const addedArticles = [...stateArticles, ...moreArticles]
        await setStateArticles(addedArticles)
      }
    } else {
      await setIsMoreArticles(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', getMoreArticles)
    return () => window.removeEventListener("scroll", getMoreArticles);
  }, [stateArticles])

  return (
    <>
      <h1 className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1>
      <div className="list container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {stateArticles.map((article:Article) => <Card article={article} key={article.id}></Card>)}
      </div>
      {isMoreArticles && (
        <div className='text-center'>
          <Image 
            src={'/default-black.svg'}
            width={30}
            height={30}
          />
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetStaticProps<Props> = async () => {
  const data = await getArticles()
  return {
    props: {
      articles: data.contents,
      totalCount: data.totalCount,
    },
  }
}