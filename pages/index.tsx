import { getArticles } from '../libs/getArticles';
import Card from '../components/Card'
import type { GetStaticProps } from 'next'
import type { Article, Articles } from '../types/article';
import { useState, useLayoutEffect } from "react";
import Image from 'next/image'

type Props = {
  articles: Article[]
  totalCount: number
}
type FetchMoreArticles = () => Promise<void | null>

export default function Home({ articles, totalCount }: Props) {
  const [stateArticles, setStateArticles] = useState<Article[]>(articles)
  const [isMoreArticles, setIsMoreArticles] = useState(true)
  const getMoreArticles: FetchMoreArticles = async () => {
    console.log('fire')
    if (stateArticles.length < totalCount) {
      const list = document.querySelector<HTMLElement>('.list')
      const listBottom: number = list!.getBoundingClientRect().bottom
      const vh: number = window.innerHeight
      if (listBottom < vh * 0.9) {
        const moreArticlesContainer: Articles = await getArticles(stateArticles.length)
        const moreArticles = moreArticlesContainer.contents
        const addedArticles = [...stateArticles, ...moreArticles]
        await setStateArticles(addedArticles)
      }
    } else {
      await setIsMoreArticles(false)
    }
  }

  const throttle = (fn: FetchMoreArticles, interval: number) => {
    let lastTime = Date.now() - interval
    return () => {
      if ((lastTime + interval) < Date.now()) {
        lastTime = Date.now()
        fn()
      }
    }
  }
  const getMoreArticlesApplyThrottle = throttle(getMoreArticles, 50)

  useLayoutEffect(() => {
    window.addEventListener('scroll', getMoreArticlesApplyThrottle)
    return () => window.removeEventListener("scroll", getMoreArticlesApplyThrottle);
  }, [stateArticles])

  return (
    <>
      <div className="list container mx-auto p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
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