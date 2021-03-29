import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-container py-8">
      <nav className="space-x-4 font-medium">
        <Link href="/">
          <a className="hover:text-indigo-900">Home</a>
        </Link>
        <Link href="/blog">
          <a className="hover:text-indigo-900">Blog</a>
        </Link>
      </nav>
    </header>
  )
}
