require('dotenv').config()
var neo4j = require('neo4j-driver')

const URI = process.env.NEO4J_URI
const USER = process.env.NEO4J_USERNAME
const PASSWORD = process.env.NEO4J_PASSWORD
let driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD)) 

module.exports = driver