
import SpairService from '~/utils/SpairService'
import { SPAIR_NAMESPACE } from '~/constants'

export const textStorageService = new SpairService(SPAIR_NAMESPACE.textStorage)

const liuchenStorageList = 'liuchen_StorageList'

export const textStorageListService = {
  async get() {
    const res = await textStorageService.get(liuchenStorageList)
    return res || []
  },
  async post(storageData) {
    let newStorageList = await textStorageListService.get()
    if (!Array.isArray(newStorageList)) {
      newStorageList = []
    }
    newStorageList = newStorageList.filter(item => item.name !== storageData.name)
    newStorageList.unshift(storageData)
    return textStorageService.post(liuchenStorageList, newStorageList)
  },
  async delete(updateTime) {
    const res = await this.get()
    const newStorageList = res.filter(item => item.updateTime !== updateTime)
    return textStorageService.post(liuchenStorageList, newStorageList)
  }
}
