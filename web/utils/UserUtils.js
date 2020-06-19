import SpairService from './SpairService'
import { SPAIR_NAMESPACE } from '@/constants'

const UserService = new SpairService(SPAIR_NAMESPACE.user)

export const findByGithubUser = async (userName) => {
  const allUser = await UserService.list()
  return allUser.find(user => user.githubUserName === userName)
}
