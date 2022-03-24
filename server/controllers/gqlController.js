const e = require("express");

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
      if (fk_name) { // if not null
        // if fk exist -> find its name and reference table
        fk_name = Object.keys(fk_name)[0]
        fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable; 
      }
      // concat the PK first -> output the query string 
      query += `${tab}type ${name} {\n${tab}${tab}${pk_name}: ${pk_type}`;
      // contact the FK second -> output the query string
      if (fk_name === null) { query+= ""}
      else {
        query += `\n${tab}${tab} ${fk_name}: [${fk_ref_table}]`;
      }
    
      // loop through the rest of the columns
      let columns = databases[name].columns
      for (column in columns) {
        if (column != pk_name && column != fk_name) {
          let column_type = columns[column].dataType
          // format the datatype to gql 
          column_type = typeData(column_type);
          // console.log(column,`converted: ${column_type}`,`table name: ${name}`)
          query += `\n${tab}${tab}${column}: ${column_type}\n`;
        }
      }
      query += `${tab}}\n`
      console.log(query)
    }

    // query += buildTypes(databases);
    return next();
  } catch (err) {
    return next({
        log: `gqlController.convertToGQLSchema: ERROR: ${err}`,
        message: { err: 'Error occurred in gqlController.convertToGQLSchema. Check server log for more details.'},
        })
  }
};

function typeData(sqlType) {
  const typeMatch = {
    integer: 'ID',
    real: 'Float',
    boolean: 'Boolean',
    date: 'String',
    varchar: 'String',
    char: 'String',
    bigint: 'Int',
    number: 'Int',
    int: 'Int',
  }
  let lowerCaseSqlType = sqlType.toLowerCase()
  if (lowerCaseSqlType === 'character varying') return 'String';
  if (typeMatch[lowerCaseSqlType]) return typeMatch[lowerCaseSqlType];
  else return '[_input data type_]';
}

module.exports = gqlController;