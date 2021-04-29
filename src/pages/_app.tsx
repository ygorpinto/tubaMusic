import GlobalStyles from "../styles/global"
import ContextProvider from "../utils/context"

function MyApp({ Component, pageProps }) {
  return (
  <>
  <ContextProvider>
    <GlobalStyles/>
    <Component {...pageProps} />
  </ContextProvider>
  </>
  )
}

export default MyApp
