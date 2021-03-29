import '../styles/globals.css'
import Header from "../components/header"


function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-indigo-50 min-h-screen antialiased text-gray-800">
      <Header />
      <main className="mt-6 mb-20">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp