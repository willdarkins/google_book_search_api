//exporting both typeDefs and resolvers files to be used in coordination with server.js
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };