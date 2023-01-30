// this is a file-base routing in nextjs => don't have to do routinf as usually do in React app.js with React-router-dom
// put these files as I want them to be structured later on - in the actual url. 
// for example, localhost3000(from index.tsx file)/posts/[slug](depend on the specific post)

import React from 'react'
import { useRouter } from 'next/router'

import {getPosts, getPostDetails} from '../../services'

import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader} from '../../components'

const PostDetails = ({post}) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader /> //we can see all the posts even after the deployment
    }

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post = {post}/>
                <Author author={post.author}/>
                <CommentsForm slug={post.slug}/>
                <Comments slug={post.slug} />
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8'>
                    <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/>
                    <Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails

// fetch data using getStaticProps - in the case that we don't have the local location to get the data but use API instead
// params is the slug or the unique url to the specific resource
export async function getStaticProps({params}) {
    const data = await getPostDetails(params.slug)

    return {
      props: {post: data} //assign {post: data}  to props and assign 'data' to 'post'
    }
}  

export async function getStaticPaths() {
    const posts = await getPosts();
    // we are specifying what kind of articles we're going to have
    // next.js app will know all the posible dynamic paths that we go to -> to render them
    return {
        // this is how the params is set to slug
        paths: posts.map(({node: {slug}})=> ({params: {slug}})),
        fallback:true,
    }
}