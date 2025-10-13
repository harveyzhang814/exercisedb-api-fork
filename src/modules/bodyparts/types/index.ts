import { BodyPart } from '../../../data/types'
import { SupportedLanguage } from '../../../common/types/i18n.types'

export type FetchAllBodyPartRes = BodyPart[]

export interface GetBodyPartsArgs {
  lang?: SupportedLanguage
}
