const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')

// Init app
const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: schema.getRootType(),
    graphiql: true
}))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/`))
