import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    price: Int!
    completed: Boolean!
    createdAt: String!
  }

  input CreateTaskInput {
    id: ID!
    title: String!
    description: String!
    price: Int!
    completed: Boolean
  }

  input UpdateTaskInput {
    title: String
    description: String
    price: Int
    completed: Boolean
  }

  type Query {
    tasks(limit: Int, offset: Int): [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!
    toggleTask(id: ID!): Task!
  }
`;
