import { useMutation } from 'mutoid/react'
import { changeViewMutation } from '../mutoid/routingStore'
import { useRoutingStore } from './RoutingProvider'

export const useMutationView = () => {
    return useMutation(useRoutingStore(), changeViewMutation, {
        deps: {
            urlUpdater: (s: string) => () => window.history.pushState(null, '', s),
            scrollTo: (px: number) => () => window.scrollTo({ top: px, behavior: 'smooth' }),
        },
    })
}
