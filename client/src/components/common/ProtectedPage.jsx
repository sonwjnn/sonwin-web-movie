import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModalOpen } from '../../redux/features/authModelSlice.js'

const ProtectedPage = () => {
  const dispatch = useDispatch()
  const {} = useSelector(state => state.user)

  useEffect(() => {
    if (!user) dispatch(setAuthModalOpen(!user))
  }, [user, dispatch])

  return user ? children : null
}

export default ProtectedPage
