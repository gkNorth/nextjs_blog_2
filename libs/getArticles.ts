import { client } from '../libs/client';

export const getArticles = async (offset:number=0, endpoint:string='blog', limit:number=6, id?:string) => {
  const data = 
    await client.get({
      endpoint: endpoint,
      queries: {
        offset,
        limit
      }
    });
  return data
}