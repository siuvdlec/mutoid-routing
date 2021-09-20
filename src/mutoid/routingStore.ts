import type * as IO from 'fp-ts/IO'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as MS from 'mutoid/state'
import { of, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import type { View } from './view'

// -------------------------------------------------------------------------------------
// Store
// -------------------------------------------------------------------------------------

export interface RoutingState {
    views: RNEA.ReadonlyNonEmptyArray<View>
}

export type RoutingStore = MS.Store<'routing', RoutingState>

export const routingStore = (initState: RoutingState): RoutingStore =>
    MS.ctor({
        name: 'routing',
        initState,
    })

// -------------------------------------------------------------------------------------
// Mutation
// -------------------------------------------------------------------------------------

export const parseUrlMutation = () =>
    MS.ctorMutation(
        'parseSession' as const,
        (_url: string) =>
            (s0: RoutingState): Observable<RoutingState> =>
                of(s0)
    )

export const changeViewMutation = (deps: {
    urlUpdater: (url: string) => IO.IO<void>
    scrollTo: (px: number) => IO.IO<void>
}) =>
    MS.ctorMutation(
        'changeView' as const,
        (l: View, scrollTo?: number) =>
            (s0: RoutingState): Observable<RoutingState> =>
                of({ views: RNEA.prependAll(l)(s0.views) }).pipe(
                    tap(ns => {
                        //deps.urlUpdater(formatUrlFromView(ns.view))()
                        typeof scrollTo === 'number' && deps.scrollTo(scrollTo)()
                    })
                )
    )
