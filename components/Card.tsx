import Link from 'next/link';
import type { Article } from '../types/article';

type Props = {
  article: Article
}

export default function Home({ article }: Props) {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <Link href={`/article/${article.id}`} passHref>
          <a className="rounded overflow-hidden shadow-lg">
            <img
              className="w-full object-cover"
              src={article.thumbnail.url}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              {article.title}
            </div>
            <div className="px-6 pt-4 pb-2">
              {article.tags && article.tags.length > 0 && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{article.tags}
                </span>
              )}
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}