export * as mutoid from './mutoid'

export interface RouteSpec<P extends string> {
    page: P
    pattern: string
}

export type Route<P extends string> = RouteSpec<P> & {
    linkTo: (hash?: string) => string
    match: (s: string) => boolean
}

export interface RouteSpecP<P extends string, PS> {
    page: P
    pattern: string
    params: PS
}

export type RouteP<P extends string, PS> = RouteSpecP<P, PS> & {
    linkTo: (ps: PS, hash?: string) => string
    match: (s: string) => boolean
}

type ToArrayNonDist<Type> = [Type] extends [any] ? Type : never

const parserUrl =
    <
        R extends Array<Route<P> | RouteP<P, PS>>,
        P extends string,
        PS = R extends Array<RouteP<any, infer A>> ? A : never
    >(
        rs: R
    ) =>
    (s: string): R[number] =>
        '' as any

declare const r1: Route<'r1'>
declare const r2: Route<'r2'>
declare const r3: RouteP<'r3', { hello: string }>
declare const r4: RouteP<'r4', { hello1: string }>

const dd = parserUrl([r1, r2, r3, r4])('he;;p')
