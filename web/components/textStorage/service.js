
import SpairService from '~/utils/SpairService'

export const textStorageService = new SpairService('textStorage')

const liuchenStorageList = 'liuchen_StorageList'

export const textStorageListService = {
  async get() {
    const res = await textStorageService.get(liuchenStorageList)
    return JSON.parse(res || '[]')
  },
  async post(storageData) {
    let newStorageList = await textStorageListService.get()
    if (!Array.isArray(newStorageList)) {
      newStorageList = []
    }
    newStorageList = newStorageList.filter(item => item.name !== storageData.name)
    newStorageList.unshift(storageData)
    const stringifyValue = JSON.stringify(newStorageList)
    return textStorageService.post(liuchenStorageList, stringifyValue)
  },
  async delete(updateTime) {
    const res = await this.get()
    const newStorageList = res.filter(item => item.updateTime !== updateTime)
    const stringifyValue = JSON.stringify(newStorageList)
    return textStorageService.post(liuchenStorageList, stringifyValue)
  }
}
