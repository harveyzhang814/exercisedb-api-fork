import { Exercise } from '../../../data/types'
import { SupportedLanguage } from '../../../common/types/i18n.types'

export { Exercise } from '../../../data/types'

export interface FetchExerciseByIdReq {
  exerciseId: string
  lang?: SupportedLanguage
}
export interface GetExercisesArgs {
  offset?: number
  limit?: number
  query?: {
    search?: string
    searchThreshold?: number
    targetMuscles?: string[]
    equipments?: string[]
    bodyParts?: string[]
    includeSecondaryMuscles?: boolean
    [key: string]: any
  }
  sort?: Record<string, 1 | -1>
  lang?: SupportedLanguage
}
export interface GetExercisesReturnArgs {
  exercises: Exercise[]
  totalPages: number
  totalExercises: number
  currentPage: number
}

export interface SearchExercisesArgs {
  offset?: number
  limit?: number
  query: string
  threshold?: number
  lang?: SupportedLanguage
}

export interface GetAllExercisesArgs {
  offset?: number
  limit?: number
  search?: string
  sort?: Record<string, 1 | -1>
  lang?: SupportedLanguage
}

export interface GetExercisesByMuscleArgs {
  offset?: number
  limit?: number
  muscle: string
  includeSecondary?: boolean
  lang?: SupportedLanguage
}

export interface GetExercisesByEquipmentArgs {
  offset?: number
  limit?: number
  equipment: string
  lang?: SupportedLanguage
}

export interface GetExercisesByBodyPartArgs {
  offset?: number
  limit?: number
  bodyPart: string
  lang?: SupportedLanguage
}

export interface FilterExercisesArgs {
  offset?: number
  limit?: number
  search?: string
  targetMuscles?: string[]
  equipments?: string[]
  bodyParts?: string[]
  sort?: Record<string, 1 | -1>
  lang?: SupportedLanguage
}

export interface GetExerciseSerivceArgs {
  offset?: number
  limit?: number
  search?: string
}
