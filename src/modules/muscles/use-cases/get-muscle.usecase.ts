import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { Muscle as FetchAllMuscleRes, GetMusclesArgs } from '../types'
import { createTranslator } from '../../../common/i18n'
import { DEFAULT_LANGUAGE } from '../../../common/types/i18n.types'

export class GetMusclesUseCase implements IUseCase<GetMusclesArgs, FetchAllMuscleRes[]> {
  constructor() {}

  async execute(args?: GetMusclesArgs): Promise<FetchAllMuscleRes[]> {
    const result = await FileLoader.loadMuscles()
    
    // Apply translation
    const language = args?.lang || DEFAULT_LANGUAGE
    const translator = createTranslator(language)
    const translatedMuscles = translator.translateMuscles(result)
    
    return translatedMuscles
  }
}
