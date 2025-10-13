import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchAllEquipmentRes, GetEquipmentsArgs } from '../types'
import { createTranslator } from '../../../common/i18n'
import { DEFAULT_LANGUAGE } from '../../../common/types/i18n.types'

export class GetEquipmentsUseCase implements IUseCase<GetEquipmentsArgs, FetchAllEquipmentRes> {
  constructor() {}

  async execute(args?: GetEquipmentsArgs): Promise<FetchAllEquipmentRes> {
    const result = await FileLoader.loadEquipments()
    
    // Apply translation
    const language = args?.lang || DEFAULT_LANGUAGE
    const translator = createTranslator(language)
    const translatedEquipments = translator.translateEquipments(result)
    
    return translatedEquipments
  }
}
