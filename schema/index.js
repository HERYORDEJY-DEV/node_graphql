import _db from '../config/database'

export const baseTypeDef = `#graphql
type Author{
    id: ID!
    fullName: String!
    # lastNae: String!
    email: String!
    # phone: String!
    verified: Boolean!
}

type Review{
    id:ID!
    rating: Int!
    content: String!
}

type Game{
    id: ID!
    title: String!
    platform: [String!]!
}

type Query {
    reviews: [Review]
    authors: [Author]
    games: [Game]
}
`

export const baseResolver = {
  Query: {
    // games
    games() {
      return _db.games
    },

    // reviews
    reviews() {
      return _db.reviews
    },

    // authors
    authors() {
      return _db.authors
    },
  },
}

// makeExecutableSchema({
//   typeDefs: [queryTypeDef, userTypeDef, reviewTypeDef],
// })
