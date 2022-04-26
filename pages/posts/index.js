import React from 'react'

const Posts = ({posts}) => {

  return (
    <div>
        <h1>List of posts</h1>
        {posts.map((post) => (
            <div>
                <h1>{post.title}</h1>
                <h3>
                    {post.author} - <small>{post.publisheDate}</small>{" "}
                </h3>
                <p>{post.content}</p>
                <hr />
            </div>
        )
        )}
    </div>
  )
}

export default Posts

export async function getServerSideProps(){
    const res = await fetch("http://localhost:4000/posts");
    const posts = await res.json();

    return{
        props: {
            posts,
        }
    }
}