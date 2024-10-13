import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import reduxStore from '@/lib/state'

const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
    return <Provider store={reduxStore}>{children}</Provider>
}

export default ReduxProvider
