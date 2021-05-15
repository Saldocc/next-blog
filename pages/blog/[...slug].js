import { useState, useEffect } from 'react'
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from "@auth0/auth0-react";

import Comments from '../../components/comments'
import Form from '../../components/form'

export default function PostPage({ post }) {
  const { getAccessTokenSilently } = useAuth0();

  const [text, setText] = useState("")
  const [url, setUrl] = useState(null)
  const [comments, setCommnets] = useState([])

  const content = useHydrate(post, {
    components: mdxComponents
  })

  const fetchComments = async () => {
    const query = new URLSearchParams({ url })
    const newUrl = `/api/comment?${query.toString()}`
    const response = await fetch(newUrl, {
      method: "GET"
    })
    const data = await response.json()
    setCommnets(data)
    console.log(response, newUrl, data)
  }

  useEffect(() => {
    if (!url) return
    fetchComments()
  }, [url])

  useEffect(() => {
    const url = window.location.origin + window.location.pathname
    setUrl(url)

  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();

    const userToken = await getAccessTokenSilently()

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ text, userToken, url }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    fetchComments()
    setText("")
  }

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
        <p>{post.frontMatter.excerpt}</p>
        <hr className="my-4" />

        <div className="prose">{content}</div>
      </article>

      < Form onSubmit={onSubmit} setText={setText} text={text} />

      <Comments comments={comments} />

    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('post'),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const post = await getMdxNode('post', context)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}