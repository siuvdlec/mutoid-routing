export type View = Views[keyof Views]

export type Views = keyof AppViews extends never
    ? {
          [s: string]: unknown
      }
    : AppViews

export interface AppViews {}
