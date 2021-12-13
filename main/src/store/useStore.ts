import { useContext } from "react"
import { MobXProviderContext, useObserver } from "mobx-react"

import store from "./Index"

type StoreKey = keyof typeof store

const useStore = <T extends StoreKey>(storeKey: T) => {
  const storeContext = useContext(MobXProviderContext) as typeof store
  return useObserver(() => storeContext[storeKey])
}

export default useStore
