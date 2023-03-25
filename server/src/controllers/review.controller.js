
import responseHandler from "../handlers/response.handler";
import tmdbApi from '../tmdb/tmdb.api.js'
import reviewModel from '../models/review.model.js'

const create = async (req, res) => {
  try {
    const {movieId} = req.params

    const review = new reviewModel({
      user: req.user.id,

      movieId,
      ...req.body

    })

    await review.save()

    responseHandler.ok(res, {
      ...review, 
      id: review.id,
      user: req.user,
    })
  } catch (error) {
  
    responseHandler.error(error)
  }
} 

const remove = async(req, res) => {
  try {

    const {reviewId} = req.params

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id
    })
    
    if(!review) return responseHandler.notfound(res)
    

    await review.remove()

    responseHandler.ok(res )
  } catch (error) {

    responseHandler.error(error)
    
  }
}

const getReviewOfUser = async(req, res) => {
  try {

    const reviews = await reviewModel.find({
      user:req.user.id
    }).sort('-createdAt')

    responseHandler.ok(res)
    
    
  } catch (error) {

    responseHandler.error(error)
    
  }
}

export default {create, remove, getReviewOfUser}
