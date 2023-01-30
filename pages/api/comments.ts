// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

type Data = {
  name: string
}

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // const {name, email, slug, comment} = req.body;

  // THIS is how we authorize grapcms client
  const  graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    }
  })
  
  // mutation is used to add new data or update the data
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

      try {
        const result = await graphQLClient.request(query, {
          name: req.body.name,
          email: req.body.email,
          comment: req.body.comment,
          slug: req.body.slug,
        });
      
        return res.status(200).send(result);
        
      } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
      }


}
