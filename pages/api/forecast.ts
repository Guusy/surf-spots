// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getBeachsData from '../../server_src/fetchData/getBeachsData'
import CacheService from '../../server_src/services/CacheService'

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await CacheService.init()
    const cacheData = await CacheService.getDataFromCache()
    if(!!cacheData){
      return res.status(200).json(JSON.parse(cacheData))
    }
    const response = await getBeachsData()
    await CacheService.saveData(response)
    res.status(200).json(response)
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message:'Error del servidor al buscar los datos'})
    
  }
  
}
