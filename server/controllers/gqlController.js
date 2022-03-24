
const gqlController = {};

const tab = `  `;

gqlController.convertToGQLSchema = (req, res, next) => {
  try {
    // start with the empty string
    let query = '';
    // const databases = res.locals.GQLmeta;
    const databases = res.locals.SQLSchema.tables;
    // console.log(databases);
    query += "require('dotenv').config();\nconst { ApolloServer } = require('apollo-server');\nconst gql = require('graphql-tag');\nconst pg = require('pg');\nconst { Pool } = require('pg');\nconst db = new Pool({ connectionString: {target_link_URI} });\nconst typeDefs = gql`\n";
    // console.log(query)
    for (const [tableName, props] of Object.entries(databases)) {
      let name = tableName; //users
      // PRIMARY KEYS
      let pk_name = databases[name].primaryKey;
      let pk_type = databases[name].columns[pk_name].dataType;
      if (pk_type === 'integer') pk_type = 'ID!'; // convert int to ID type
      // FOREIGN KEYS (assuming only 1fk per table)
      let fk_name = databases[name].foreignKeys //if fk = null -> shows up as a string
      let fk_ref_table = '';
      // console.log(fk_name)
      if (!fk_name) {
        fk_name = '';
      } else {
        // if fk exist -> find its name and reference table
        fk_name = Object.keys(fk_name)[0]
        fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable; //add [] in the string
      }

      query += `${tab} type ${name} {\n${tab}${pk_name}: ${pk_type}\n`;
      console.log(query)
      // loop through the rest of the columns
      let columns = databases[name].columns
      for (column in columns) {
        // console.log(column);
      }
      // console.log(name, pk_name, pk_type)
      query += `${tab}}\n`
    }

    // query += buildTypes(databases);
    next();
  } catch (err) {
    next({
        log: `gqlController.convertToGQLSchema: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: { err: 'Error occurred in gqlController.convertToGQLSchema. Check server log for more details.'},
        })
  }
}



module.exports = gqlController;