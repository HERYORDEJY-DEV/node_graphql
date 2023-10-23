import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
// import database from './database'

let games = [
  { id: '1', title: 'Zelda, Tears of the Kingdom', platform: ['Switch'] },
  { id: '2', title: 'Final Fantasy 7 Remake', platform: ['PS5', 'Xbox'] },
  { id: '3', title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC'] },
  { id: '4', title: 'Mario Kart', platform: ['Switch'] },
  { id: '5', title: 'Pokemon Scarlet', platform: ['PS5', 'Xbox', 'PC'] },
]

let authors = [
  { id: '1', fullName: 'mario mandzukic', verified: true },
  { id: '2', fullName: 'yoshi honda', verified: false },
  { id: '3', fullName: 'declan beans', verified: true },
]

let reviews = [
  { id: '1', rating: 9, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '2', rating: 10, content: 'lorem ipsum', author_id: '2', game_id: '1' },
  { id: '3', rating: 7, content: 'lorem ipsum', author_id: ' 3', game_id: '3' },
  { id: '4', rating: 5, content: 'lorem ipsum', author_id: '2', game_id: '4' },
  { id: '5', rating: 8, content: 'lorem ipsum', author_id: '2', game_id: '5' },
  { id: '6', rating: 7, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '7', rating: 10, content: 'lorem ipsum', author_id: '3', game_id: '1' },
]

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Author" type defines the queryable fields for every book in our data source.
  
type Author{
    id: ID!
    fullName: String!
    email: String!
    verified: Boolean!
    reviews: [Review!]
}

type Review{
    id:ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
}

type Game{
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
}

input AddGame{
    title: String!
    platform: [String!]!
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    reviews: [Review]
    authors: [Author]
    games: [Game]
    game(id: ID!): Game
    review(id: ID!): Review
  }

  type Mutation {
    deleteGame(id: ID!): [Game]
    addGame(game: AddGame!): [Game]
  }
`

const resolvers = {
  Query: {
    // games
    games() {
      return games
    },

    // game
    game: (_, { id }) => {
      const found = games.find(game => game.id === id)
      return found
    },

    // reviews
    reviews() {
      return reviews
    },

    // one review
    review: (_, { id }) => reviews.find(rev => rev.id === id),

    // authors
    authors() {
      return authors
    },
  },

  Mutation: {
    deleteGame: (_, { id }) => games.filter(game => game.id !== id),
    addGame: (_, { game }) => {
      game = { ...game, id: Math.floor(Math.random() * 99) + 1 }
      games.push(game)
      return [...games]
    },
  },

  Game: {
    // review
    reviews: ({ id }) => reviews.filter(review => review.game_id === id),
  },

  Author: {
    // reviews
    reviews: ({ id }) => reviews.filter(review => review.author_id === id),
  },

  Review: {
    author: ({ author_id }) => authors.find(author => author.id === author_id),

    game: ({ game_id }) => games.find(game => game.id === game_id),
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
