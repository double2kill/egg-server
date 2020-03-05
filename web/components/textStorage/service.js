
import SpairService from '~/utils/SpairService'

export const textStorageService = new SpairService('textStorage')

const liuchenStorageList = 'liuchen_StorageList'

export const textStorageListService = {
  get: async () => {
    const res = await textStorageService.get(liuchenStorageList)
    return JSON.parse(res || '[]')
  },
  post: (value) => {
    const stringifyValue = JSON.stringify(value)
    return textStorageService.post(liuchenStorageList, stringifyValue)
  }
}
