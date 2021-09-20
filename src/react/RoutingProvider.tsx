import * as O from 'fp-ts/Option'
import { useStore } from 'mutoid/react'
import * as React from 'react'
import { RoutingStore, routingStore } from '../mutoid/routingStore'
import type { View } from '../mutoid/view'

const RoutingStoreContext = React.createContext<O.Option<RoutingStore>>(O.none)

export const useRoutingStore = (): RoutingStore => {
    const context = React.useContext(RoutingStoreContext)

    if (context._tag === 'None') {
        throw new Error('no routing context found')
    }

    return context.value
}

export const RoutingProvider: React.FC<{ initView: View }> = ({ children, initView }) => {
    const routingStoreRef = useStore(() => routingStore({ views: [initView] }))

    return <RoutingStoreContext.Provider value={O.some(routingStoreRef)}>{children}</RoutingStoreContext.Provider>
}
