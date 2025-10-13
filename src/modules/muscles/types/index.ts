import { SupportedLanguage } from '../../../common/types/i18n.types'

export interface Muscle {
  name: string
}

export interface GetMusclesArgs {
  lang?: SupportedLanguage
}
