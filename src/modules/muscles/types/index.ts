export interface Muscle {
  name: string
}

export type FetchAllMuscleRes = Muscle[]

export interface GetMusclesArgs {
  lang?: string
}