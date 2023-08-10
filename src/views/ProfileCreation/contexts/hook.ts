// @ts-nocheck
// @ts-nocheck
import { useContext } from 'react'
import { ProfileCreationContext } from './ProfileCreationProvider'

const useProfileCreation = () => {
  return useContext(ProfileCreationContext)
}

export default useProfileCreation
