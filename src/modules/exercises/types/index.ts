import { Exercise } from '../../../data/types'

export { Exercise } from '../../../data/types'

export interface FetchExerciseByIdReq {
  exerciseId: string
  lang?: string
}
export interface GetExercisesArgs {
  offset?: number
  limit?: number
  lang?: string
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
  lang?: string
  query: string
  threshold?: number
}

export interface GetAllExercisesArgs {
  offset?: number
  limit?: number
  lang?: string
  search?: string
  sort?: Record<string, 1 | -1>
}

export interface GetExercisesByMuscleArgs {
  offset?: number
  limit?: number
  lang?: string
  muscle: string
  includeSecondary?: boolean
}

export interface GetExercisesByEquipmentArgs {
  offset?: number
  limit?: number
  lang?: string
  equipment: string
}

export interface GetExercisesByBodyPartArgs {
  offset?: number
  limit?: number
  lang?: string
  bodyPart: string
}

export interface FilterExercisesArgs {
  offset?: number
  limit?: number
  lang?: string
  search?: string
  targetMuscles?: string[]
  equipments?: string[]
  bodyParts?: string[]
  sort?: Record<string, 1 | -1>
}

export interface GetExerciseSerivceArgs {
  offset?: number
  limit?: number
  lang?: string
  search?: string
}
