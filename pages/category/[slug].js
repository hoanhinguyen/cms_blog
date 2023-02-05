import React from 'react';
import { useRouter } from 'next/router';
import {server} from '../../config/index'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export const  getStaticProps = async({ params }) => {

  // const client = new ApolloClient({
  //   uri: '',
  //   cache: new InMemoryCache()
  // });

  // const posts = await client.query({
  //   query: gql`
  //     query GetCategoryPost(${params.slug}}) {
  //       postsConnection(where: {categories_some: {slug: ${params.slug}}}) {
  //         edges {
  //           cursor
  //           node {
  //             author {
  //               bio
  //               name
  //               id
  //               photo {
  //                 url
  //               }
  //             }
  //             createdAt
  //             slug
  //             title
  //             excerpt
  //             featuredImage {
  //               url
  //             }
  //             categories {
  //               name
  //               slug
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // });
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  const categoriesPaths = categories.map(({slug})=> ({params: {slug}} ) );

  return {
    paths:  categoriesPaths,  //categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };

  // https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
}