import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchAllEquipmentRes, GetEquipmentsArgs } from '../types'
import { DEFAULT_LANGUAGE } from '../../../common/types/i18n.types'

export class GetEquipmentsUseCase implements IUseCase<GetEquipmentsArgs, FetchAllEquipmentRes> {
  constructor() {}

  async execute(args?: GetEquipmentsArgs): Promise<FetchAllEquipmentRes> {
    const language = args?.lang || DEFAULT_LANGUAGE
    
    // 获取翻译后的数据
    const result = await FileLoader.getTranslatedEquipments(language)
    
    return result
  }
}
