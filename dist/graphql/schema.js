"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.typeDefs = (0, graphql_tag_1.gql) `
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
