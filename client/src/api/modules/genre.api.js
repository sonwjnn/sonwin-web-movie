import publicClient from '../client/public.client'

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
}

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      //errorrrr
      const response = await publicClient.get(genreEndpoints.list, {
        mediaType,
      })
      return { response }
    } catch (error) {
      console.log({ error })
      return { error }
    }
  },
}

export default genreApi
