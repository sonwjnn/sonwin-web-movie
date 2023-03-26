import express from 'express'
import { body } from 'express-validator'
import favoriteController from '../controllers/favorite.controller.js'
import userController from '../controllers/user.controller.js'
import requestHandler from '../handlers/request.handler.js'
import userModel from '../models/user.model.js'
import tokenMiddleWare from '../middlewares/token.middleware.js'

const router = express.Router()

router.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 9 })
    .withMessage('username minium 8 characters')
    .custom(async value => {
      const user = await userModel.findOne({ username: value })
      if (user) return requestHandler.reject('username already used')
    }),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 9 })
    .withMessage('password minium 8 characters'),
  body('confirmPassword')
    .exists()
    .withMessage('confirm password is required')
    .isLength({ min: 9 })
    .withMessage('confirm password minium 8 characters')
    .custom((value, { req }) => {
      if (value !== request.body.password)
        throw new Error('confirm password not match')
      return true
    }),
  body('displayName')
    .exists()
    .withMessage('display name is required')
    .isLength({ min: 9 })
    .withMessage('displayName minium 8 characters'),
  requestHandler.validate,
  userController.signup
)

router.post(
  '/signin',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 9 })
    .withMessage('username minium 8 characters'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 9 })
    .withMessage('password minium 8 characters'),
  requestHandler.validate,
  userController.signin
)

router.put(
  '/update-password',

  tokenMiddleWare.auth,

  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 9 })
    .withMessage('password minium 8 characters'),
  body('newPassword')
    .exists()
    .withMessage('new password is required')
    .isLength({ min: 9 })
    .withMessage('new password minium 8 characters'),
  body('confirmNewPassword')
    .exists()
    .withMessage('confirm new password is required')
    .isLength({ min: 9 })
    .withMessage('confirm new password minium 8 characters')
    .custom((value, { req }) => {
      if (value !== request.body.newPassword)
        throw new Error('confirm new password not match')
      return true
    }),
  requestHandler.validate,
  userController.updatePassword
)

router.get('/info', tokenMiddleWare.auth, userController.getInfo)

router.get(
  '/favorites',
  tokenMiddleWare.auth,
  favoriteController.getFavoritesOfUser
)

router.post(
  '/favorites',
  tokenMiddleWare.auth,
  body('mediaType')
    .exists()
    .withMessage('media type  is required')
    .custom(type => ['movie', 'tv'].includes(type))
    .withMessage('media type invalid'),
  body('mediaId')
    .exists()
    .withMessage('media id is required')
    .isLength({ min: 2 })
    .withMessage('media cannot be empty'),
  body('mediaTitle').exists().withMessage('media title is required'),
  body('mediaPoster').exists().withMessage('media poster title is required'),
  body('mediaRate').exists().withMessage('media rate is required'),
  requestHandler.validate,
  favoriteController.addFavorite
)

router.delete(
  '/favorites/:favoriteId',
  tokenMiddleWare.auth,
  favoriteController.removeFavorite
)

export default router
