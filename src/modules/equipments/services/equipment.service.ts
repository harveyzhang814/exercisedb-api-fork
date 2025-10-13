import { GetEquipmentsUseCase } from '../use-cases'
import { GetEquipmentsArgs } from '../types'

export class EquipmentService {
  private readonly getEquipmentUseCase: GetEquipmentsUseCase

  constructor() {
    this.getEquipmentUseCase = new GetEquipmentsUseCase()
  }

  getEquipments = (args?: GetEquipmentsArgs) => {
    return this.getEquipmentUseCase.execute(args)
  }
}
