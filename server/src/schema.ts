import { Context } from './context'
import * as jwt from 'jsonwebtoken'
export interface Decoded {
  userId: string
  exp: number
}

const APP_SECRET = 'secret'

export const typeDefs = `
type User {
  email: String!
  id: ID!
  name: String
  posts: [Post!]!
}

type Post {
  author: User
  content: String
  id: ID!
  published: Boolean!
  title: String!
}

type Query {
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(where: PostWhereUniqueInput!): Post
  me: User!
}

type Mutation {
  createDraft(authorEmail: String, content: String, title: String!): Post!
  deleteOnePost(where: PostWhereUniqueInput!): Post
  publish(id: ID): Post
  signupUser(name: String!, email: String!, password: String!): AuthPayload!
}

type AuthPayload {
  token: String!
  user: User!
}

input PostWhereUniqueInput {
  id: ID
}

input UserCreateInput {
  email: String!
  password: String!
  name: String
}

input PostCreateManyWithoutPostsInput {
  connect: [PostWhereUniqueInput!]
  create: [PostCreateWithoutAuthorInput!]
}

input PostCreateWithoutAuthorInput {
  content: String
  id: ID
  published: Boolean
  title: String!
}
`

export const resolvers = {
  Query: {
    me: (parent, args, ctx: Context) => {
      const { authorization } = ctx.req.headers
      const token = authorization.replace('Bearer ', '')
      const decoded = jwt.verify(token, APP_SECRET)
      const userId = (decoded as Decoded).userId

      if (userId) {
        return ctx.prisma.user.findUnique({ where: { id: Number(userId) } })
      }
      throw new Error('Not loggedin')
    },
    feed: (parent, args, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
      })
    },
    filterPosts: (parent, args, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    post: (parent, args, ctx: Context) => {
      return ctx.prisma.post.findUnique({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    createDraft: (parent, args, ctx) => {
      return ctx.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    deleteOnePost: (parent, args, ctx: Context) => {
      return ctx.prisma.post.delete({
        where: { id: Number(args.where.id) },
      })
    },
    publish: (parent, args, ctx: Context) => {
      return ctx.prisma.post.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },
    signupUser: async (parent, args, ctx: Context) => {
      const user = await ctx.prisma.user.create({
        data: {
          name: args.name,
          password: args.password,
          email: args.email,
        },
      })
      return {
        user,
        token: jwt.sign({ userId: user.id }, APP_SECRET, {
          expiresIn: '2d',
        }),
      }
    },
  },
  User: {
    posts: (parent, args, ctx: Context) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    author: (parent, args, ctx: Context) => {
      return ctx.prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}
