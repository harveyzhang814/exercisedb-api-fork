import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchAllMuscleRes, GetMusclesArgs } from '../types'

export class GetMusclesUseCase implements IUseCase<GetMusclesArgs, FetchAllMuscleRes> {
  constructor() {}

  async execute(args: GetMusclesArgs = {}): Promise<FetchAllMuscleRes> {
    const result = await FileLoader.loadMuscles(args.lang)
    return result
  }
}
