import '../styles/globals.css'
import Header from "../components/header"
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTHO_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTHO_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_URL}
    >
      <div className="bg-indigo-50 min-h-screen antialiased text-gray-800">
        <Header />
        <main className="mt-6 mb-20">
          <Component {...pageProps} />
        </main>
      </div>
    </Auth0Provider>
  )
}

export default MyApp