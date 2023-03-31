import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModelOpen } from '../../redux/features/authModelSlice.js'

const ProtectedPage = ({children}) => {
  const dispatch = useDispatch()
  const {} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(setAuthModalOpen(!user))
  }, [user, dispatch])

  return user ? children : null
}

export default ProtectedPage
