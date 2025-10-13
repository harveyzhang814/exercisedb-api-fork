import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchAllBodyPartRes, GetBodyPartsArgs } from '../types'
import { createTranslator } from '../../../common/i18n'
import { DEFAULT_LANGUAGE } from '../../../common/types/i18n.types'

export class GetBodyPartsUseCase implements IUseCase<GetBodyPartsArgs, FetchAllBodyPartRes> {
  constructor() {}

  async execute(args?: GetBodyPartsArgs): Promise<FetchAllBodyPartRes> {
    const result = await FileLoader.loadBodyParts()
    
    // Apply translation
    const language = args?.lang || DEFAULT_LANGUAGE
    const translator = createTranslator(language)
    const translatedBodyParts = translator.translateBodyParts(result)
    
    return translatedBodyParts
  }
}
