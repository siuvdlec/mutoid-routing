/* eslint-disable @typescript-eslint/no-unused-vars */
import { pipe } from 'fp-ts/function'
import { compile } from 'path-to-regexp'

// interface Home {
//     readonly _tag: 'Home'
// }

// interface NotFound {
//     readonly _tag: 'NotFound'
// }

// const home: Location = { _tag: 'Home' }

// const notFound: Location = { _tag: 'NotFound' }

// type Location = Home | NotFound

// const keys: any[] = []
// const regexp = pathToRegexp('/foo/:bar(\\d+)-:xxx', keys)

// const toPath = compile('/user/:id', { encode: encodeURIComponent })

export type ExtractRouteOptionalParam<T extends string, U = string | number | boolean> = T extends `${infer Param}?`
    ? { [k in Param]?: U }
    : T extends `${infer Param}*`
    ? { [k in Param]?: U }
    : T extends `${infer Param}+`
    ? { [k in Param]: U }
    : { [k in T]: U }

export type ExtractRouteParams<T extends string, U = string | number | boolean> = string extends T
    ? { [k in string]?: U }
    : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}/${infer Rest}`
    ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})`
        ? ExtractRouteOptionalParam<Param, U> & ExtractRouteParams<Rest, U>
        : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U> & ExtractRouteParams<Rest, U>
    : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}`
    ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})`
        ? ExtractRouteOptionalParam<Param, U>
        : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U>
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {}

const myCompile = <
    Path extends string = string,
    Params extends { [K: string]: { toString: () => string } | undefined } = ExtractRouteParams<
        Path,
        { toString: () => string }
    >
>(
    s: Path
): ((p: Params) => string) => {
    return (p: Params) =>
        pipe(
            Object.keys(p).reduce((c, k) => ({ ...c, [k]: p[k]?.toString() }), {}),
            compile(s)
        )
}

const ddd = myCompile('/user/:id/:hhh')
const ddd1 = myCompile('/user/home.html')

class Hei {
    toString() {
        return '1'
    }
}

const dd = ddd({ id: 1, hhh: new Hei() })
const aa = ddd1({})

console.log(dd, aa)
