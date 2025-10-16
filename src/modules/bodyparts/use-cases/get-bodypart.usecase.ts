import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchAllBodyPartRes, GetBodyPartsArgs } from '../types'

export class GetBodyPartsUseCase implements IUseCase<GetBodyPartsArgs, FetchAllBodyPartRes> {
  constructor() {}

  async execute(args: GetBodyPartsArgs = {}): Promise<FetchAllBodyPartRes> {
    const result = await FileLoader.loadBodyParts(args.lang)
    return result
  }
}
