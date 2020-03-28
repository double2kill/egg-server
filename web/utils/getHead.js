import { routeNameMap } from '@/constants'
export default function () {
  const { path, name } = this.$route
  return {
    title: routeNameMap[path] || name
  }
}
