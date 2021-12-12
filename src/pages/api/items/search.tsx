import { postCleanup, warframeItems } from '../../../lib/api'

export default function handler(req, res) {
  const items = warframeItems.items.filter(item => {
    return item.name.toLowerCase().includes(req.query.q.toLowerCase())
  }).slice(0, 15)

  res.status(200).json(
    postCleanup(
      items,
      req.query
    )
  )
}
