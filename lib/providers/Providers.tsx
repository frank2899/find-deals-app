'use client'

import { ThemeProvider } from 'styled-components'
import theme from '@/lib/theme'
import GlobalStyles from '@/lib/global-styles'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import StyledComponentsRegistry from './registry'
import ReduxProvider from './Redux'
import { SearchProvider } from '../context/searchContext'

const Providers = (props: React.PropsWithChildren) => {
    return (
        <StyledComponentsRegistry>
            <ReduxProvider>
                <GlobalStyles />
                <ThemeProvider theme={theme}>
                    <CacheProvider>
                        <SearchProvider>
                            <ChakraProvider>{props.children}</ChakraProvider>
                        </SearchProvider>
                    </CacheProvider>
                </ThemeProvider>
            </ReduxProvider>
        </StyledComponentsRegistry>
    )
}

export default Providers
