import { IUseCase } from '#common/types/use-case.type.js'
import { FileLoader } from '../../../data/load'
import { FetchAllEquipmentRes, GetEquipmentsArgs } from '../types'

export class GetEquipmentsUseCase implements IUseCase<GetEquipmentsArgs, FetchAllEquipmentRes> {
  constructor() {}

  async execute(args: GetEquipmentsArgs = {}): Promise<FetchAllEquipmentRes> {
    const result = await FileLoader.loadEquipments(args.lang)
    return result
  }
}
