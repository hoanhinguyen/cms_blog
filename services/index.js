import { graphql, graphqlSync } from 'graphql';
import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    // starting fetching our posts

    // '$'slug and '$'categories are used to select the current key, then specify the accepted data type
// slug_not: '$'slug,  AND '{c'atefories_some:' {'slug_in: $categories: don't display the current content but display some of the categories that we want to get
const query = gql`
query MyQuery {
  postsConnection {
    edges {
      cursor
      node {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  }
}
`;

const result = await request(graphqlAPI, query);

return result.postsConnection.edges;
};

// pass slug as an object in the parameter

export const getPostDetails = async (slug) => {
    const query = gql ` 
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug}) {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                excerpt
                categories {
                    name
                    slug
                }
                slug
                title
                featuredImage {
                    url
                }
                content {
                    raw
                }
            }
        }
    `
    const results = await request(graphqlAPI, query, {slug});

    return results.post;
}

export const getRecentPosts = async () => {
    const query = gql `
        query GetPostDetails () {
            posts(
                orderBy: createdAt_ASC
                last:3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const results = await request(graphqlAPI, query);

    return results.posts;
}


export const getSimilarPosts = async (categories, slug) => {
    const query = gql `
        query GetPostDetails ($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug,  AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        } 
    `
    const results = await request(graphqlAPI, query, {categories, slug});

    return results.posts;
}

export const getCategories = async () => {
    const query = gql`
      query GetGategories {
          categories {
            name
            slug
          }
      }
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.categories;
  };

//   this is an http request to our nextjs backend  => next, create our own backend endpoint 
// this will accept a comment acctually do smt with it => graphcms allows our own backend to interact with our service to actually
// submit a comment to graphcms => we can approve the comments in the graphcsm dashboard
  export const sumbmitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(obj),
    })

    return result.json();
  }

  export const getComments = async (slug) => {
    const query = gql`
      query GetComments($slug:String!) {
          comments (where: {post: {slug:$slug}}) {
            name 
            createdAt
            comment
          }
      }
    `;
  
    const result = await request(graphqlAPI, query, {slug});
  
    return result.comments;
  };

  export const getFeaturedPosts = async () => {
    const query = gql `
        query GetFeaturedPosts() {
            posts(where: {featuredPost: true}) {
                author {
                    name
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
                title
                slug
                createdAt
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts
  }

  export const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
  };
