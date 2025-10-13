import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { Muscle as FetchAllMuscleRes, GetMusclesArgs } from '../types'
import { DEFAULT_LANGUAGE } from '../../../common/types/i18n.types'

export class GetMusclesUseCase implements IUseCase<GetMusclesArgs, FetchAllMuscleRes[]> {
  constructor() {}

  async execute(args?: GetMusclesArgs): Promise<FetchAllMuscleRes[]> {
    const language = args?.lang || DEFAULT_LANGUAGE
    
    // 获取翻译后的数据
    const result = await FileLoader.getTranslatedMuscles(language)
    
    return result
  }
}
