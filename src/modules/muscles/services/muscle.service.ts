import { GetMusclesUseCase } from '../use-cases'
import { GetMusclesArgs } from '../types'

export class MuscleService {
  private readonly getMuscleUseCase: GetMusclesUseCase

  constructor() {
    this.getMuscleUseCase = new GetMusclesUseCase()
  }

  getMuscles = (args: GetMusclesArgs = {}) => {
    return this.getMuscleUseCase.execute(args)
  }
}
