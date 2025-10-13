import { Equipment } from '../../../data/types'
import { SupportedLanguage } from '../../../common/types/i18n.types'

export type FetchAllEquipmentRes = Equipment[]

export interface GetEquipmentsArgs {
  lang?: SupportedLanguage
}
