import { useRouter } from 'next/router'
import React from 'react'

const PostDetail = () => {
    const router = useRouter()
    const {postId} = router.query;
    console.log(router)
  return (
    <div>Post Details - {postId}</div>
  )
}

export default PostDetail