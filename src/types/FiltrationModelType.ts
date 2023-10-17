export module FiltrationModelType {
  export type SortingOption = "ASC" | "DESC"

  export type FiltrationOption = Record<string, boolean>

  export type FiltrationModel = {
    filtration: FiltrationOption
    sorting: SortingOption
  }
}
