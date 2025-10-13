import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchAllBodyPartRes, GetBodyPartsArgs } from '../types'
import { DEFAULT_LANGUAGE } from '../../../common/types/i18n.types'

export class GetBodyPartsUseCase implements IUseCase<GetBodyPartsArgs, FetchAllBodyPartRes> {
  constructor() {}

  async execute(args?: GetBodyPartsArgs): Promise<FetchAllBodyPartRes> {
    const language = args?.lang || DEFAULT_LANGUAGE
    
    // 获取翻译后的数据
    const result = await FileLoader.getTranslatedBodyParts(language)
    
    return result
  }
}
