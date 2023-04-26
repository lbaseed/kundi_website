import { request, gql, GraphQLClient } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

const client = new GraphQLClient(graphqlAPI, {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export const getArticles = async () => {
  const query = gql`
    query articles($first: Int = 25, $page: Int = 1) {
      articles(first: $first, page: $page) {
        data {
          id
          uuid
          title
          slug
          excerpt
          featured_image
          created_at
          user {
            uuid
            name
            uuid
            email
            photo
          }
          categories {
            uuid
            name
            slug
            id
          }
        }
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.articles.data
}

export const getArticleDetails = async slug => {
  const query = gql`
    query getArticle($slug: String) {
      getArticle(slug: $slug) {
        id
        uuid
        title
        slug
        excerpt
        content
        featured_image
        featured_article
        created_at
        categories {
          name
          slug
          id
        }
        user {
          uuid
          name
          uuid
          email
          photo
        }
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug })

  return result.getArticle
}

export const getRecentArticles = async () => {
  const query = gql`
    query articles($first: Int = 3, $page: Int = 1) {
      articles(
        first: $first
        page: $page
        orderBy: { column: CREATED_AT, order: DESC }
      ) {
        data {
          title
          slug
          featured_image
          created_at
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.articles.data
}

export const getSimilarArticles = async (categories, slug) => {
  const query = gql`
        query articles($slug: String!, $categories: [String!]){
            articles(
                first: 5 
                where: {slug_not: $slug, AND {categories_some: {slug_in: $categories }}}
            ){
                data {
                    title
                    slug
                    featured_image
                    created_at
                }
            }
        }
    `

  const result = await request(graphqlAPI, query, { categories, slug })
    console.log(`logged redult: ${result}`)
  return result.articles.data
}

export const getCategories = async () => {
  const query = gql`
    query categories($first: Int = 25, $page: Int = 1) {
      categories(first: $first, page: $page) {
        data {
          name
          slug
          uuid
          id
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.categories.data
}
