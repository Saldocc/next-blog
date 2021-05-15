import { nanoid } from "nanoid";
import Redis from "ioredis";


export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { url, userToken, text } = req.body

    if (!url || !userToken || !text) {
      res.status(400).json({ name: 'Eksik veya hatalı parametre(ler)' })
    }

    const userResponse = await fetch(`https://${process.env.NEXT_PUBLIC_AUTHO_DOMAIN}/userinfo`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })

    const user = await userResponse.json()

    const comment = {
      id: nanoid(),
      createdAt: Date.now(),
      text,
      user: {
        name: user.name,
        picture: user.picture,
      }
    }

    let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);

    redis.lpush(url, JSON.stringify(comment))

    redis.quit()

    res.status(200).json(comment)

  }

  if (req.method === 'GET') {
    const { url } = req.query

    let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);

    const comments = await redis.lrange(url, 0, -1)

    redis.quit()

    const data = comments.map(comment => JSON.parse(comment))

    res.status(200).json(data)
  }
}