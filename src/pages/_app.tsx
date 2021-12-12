import 'tailwindcss/tailwind.css'
import store from '../store'
import { Provider } from 'react-redux'
import Link from 'next/link'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <nav className="bg-blue-500">
        <ul className="flex max-w-2xl mx-auto">
          <li>
            <Link href="/">
              <a
                className="block text-white text-2xl font-bold py-2 px-4 hover:bg-white hover:text-blue-500 transition-colors"
              >Home</a>
            </Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
