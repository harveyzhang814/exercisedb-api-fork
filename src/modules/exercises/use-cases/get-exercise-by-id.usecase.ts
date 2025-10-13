import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchExerciseByIdReq, Exercise as FetchExerciseByIdRes } from '../types'
import { HTTPException } from 'hono/http-exception'
import { DEFAULT_LANGUAGE } from '../../../common/types/i18n.types'

export class GetExerciseByIdUseCase implements IUseCase<FetchExerciseByIdReq, FetchExerciseByIdRes> {
  constructor() {}

  async execute(request: FetchExerciseByIdReq): Promise<FetchExerciseByIdRes> {
    const { exerciseId, lang } = request
    const language = lang || DEFAULT_LANGUAGE
    
    // 获取翻译后的数据
    const exerciseData = await FileLoader.getTranslatedExercises(language)
    const isExerciseExist = exerciseData.find((exer) => exer.exerciseId === exerciseId)
    
    // check is exercise exist
    if (!isExerciseExist) {
      throw new HTTPException(404, {
        message: `exercise ${exerciseId} not found. `
      })
    }

    // 直接返回（已经是翻译后的数据）
    return isExerciseExist
  }
}
