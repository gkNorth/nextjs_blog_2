export type Article = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  category: string[]
  tags: string[]
  thumbnail: {
    url: string
    height: number
    width: number
  }
  seo_title: string
  meta_description: string
  mata_keywords: string
}