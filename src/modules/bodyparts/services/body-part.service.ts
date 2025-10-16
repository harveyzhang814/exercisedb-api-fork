import { GetBodyPartsUseCase } from '../use-cases'
import { GetBodyPartsArgs } from '../types'

export class BodyPartService {
  private readonly getBodyPartsUseCase: GetBodyPartsUseCase

  constructor() {
    this.getBodyPartsUseCase = new GetBodyPartsUseCase()
  }

  getBodyParts = (args: GetBodyPartsArgs = {}) => {
    return this.getBodyPartsUseCase.execute(args)
  }
}
