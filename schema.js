const { default: axios } = require('axios')
const { query } = require('express')
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

const BASE_URL = 'http://localhost:3000/customers'
// Hardcoded data
// const customers = [
//     { id: '1', name: 'John Doe', email: 'jdoe@invalid.com', age: 35 },
//     { id: '2', name: 'Steve Smith', email: 'steves@invalid.com', age: 25 },
//     { id: '3', name: 'Sarah Williams', email: 'swill@invalid.com', age: 32 }
// ]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                // for (let i = 0; i < customers.length; i++) {
                //     if (customers[i].id === args.id) {
                //         console.log(customers[i]);
                //         return customers[i]
                //     }
                // }

                return axios.get(`${BASE_URL}/${args.id}`)
                    .then(res => {
                        return res.data
                    })
                // .catch(err => ([]))
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve() {
                axios.get(`${BASE_URL}/`)
                    .then(res => {
                        const data = res.data
                        console.log(data);
                        return data
                    })
                return customers
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
})

module.exports = schema