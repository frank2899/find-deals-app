import { createGlobalStyle } from 'styled-components'

const styled = { createGlobalStyle }

const GlobalStyles = styled.createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html,
    body {
        background: #c6cde0;
    }
`

export default GlobalStyles
