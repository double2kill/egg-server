
import SpairService from '~/utils/SpairService'
import { SPAIR_NAMESPACE } from '~/constants'

export const textStorageService = new SpairService(SPAIR_NAMESPACE.textStorage)
