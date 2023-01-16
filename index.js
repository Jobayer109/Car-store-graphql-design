const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    groupAddCars(groupId: ID!, carId: ID!)
    groupRemoveCars(groupId: ID!, carId: ID!)
    groupCreate(
      groupInput: GroupInput!
    )
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput! 
    ): GroupUpdatePayload!
    }

type GroupUpdatePayload{
  userError: [UserError!]!
  group: Group
}

type UserError {
  message: String!
  field: [String!]!
}

input GroupInput {
  name: String!
      image: ImageInput!
      description: String!
      featureSet: GroupFeaturesSet 
}

  type ImageInput{
    url: String!  
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    name: String!
    image: Image!
    description: String!
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    features: GroupFeaturesSet
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeaturesSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  # type ManualGroup {
  #  Image
  #  [Car]
  # #  [GroupMembership]
  # }

  # type Group {
  #   Image
  # #  [GroupMembership]
  #   [Car]
  #   [GroupFeatures]
  # }

  type GroupFeatures {
    features: String!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }

  # type GroupMembership {
  #   Group
  #   Car
  # }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log("Server is running at" + url);
});
