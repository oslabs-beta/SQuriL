const e = require("express");

const gqlController = {};

const tab = `  `;

gqlController.convertToGQLSchema = (req, res, next) => {
  try {
    // start with the empty string
    let query = '';
    const databases = res.locals.SQLSchema.tables;
    query += "require('dotenv').config();\nconst { ApolloServer } = require('apollo-server');\nconst gql = require('graphql-tag');\nconst pg = require('pg');\nconst { Pool } = require('pg');\nconst db = new Pool({ connectionString: {target_link_URI} });\nconst typeDefs = gql`\n";

    function typeEachTable() {
      // pretreat the necessary data from EACH table
      for (const [tableName, props] of Object.entries(databases)) {
        let name = tableName; //users
        // PRIMARY KEYS
        let pk_name = databases[name].primaryKey;
        let pk_type = databases[name].columns[pk_name].dataType;
        if (pk_type === 'integer') pk_type = 'ID!'; // convert int to ID type
        // FOREIGN KEYS (assuming only 1fk per table)
        let fk_name = databases[name].foreignKeys //if fk = null -> shows up as a string
        let fk_type = '';
        let fk_ref_table = '';
        if (fk_name) { // if not null
          // if fk exist -> find its name and reference table
          fk_name = Object.keys(fk_name)[0]
          fk_type = databases[name].columns[fk_name].dataType;
          fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable; 
        }
        // build the typeDef per for EACH table
        query += typeEachTabletTemplate(databases, name, pk_name, pk_type, fk_name, fk_ref_table)
      }
    }
    function typeQuery() {
      query += `\n${tab}type Query {`;
      // pretreat the necessary data from EACH table
      for (const [tableName, props] of Object.entries(databases)) {
        let name = tableName; //users
        // PRIMARY KEYS
        let pk_name = databases[name].primaryKey;
        let pk_type = databases[name].columns[pk_name].dataType;
        if (pk_type === 'integer') pk_type = 'ID!'; // convert int to ID type
        // FOREIGN KEYS (assuming only 1fk per table)
        let fk_name = databases[name].foreignKeys //if fk = null -> shows up as a string
        let fk_type = '';
        let fk_ref_table = '';
        if (fk_name) { // if not null
          // if fk exist -> find its name and reference table
          fk_name = Object.keys(fk_name)[0]
          fk_type = databases[name].columns[fk_name].dataType;
          fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable; 
        }
        // build the typeDef per for EACH table
        query += typeQueryTemplate(databases, tableName, pk_name, pk_type, fk_name, fk_type, fk_ref_table);
      }
    }
    typeEachTable();
    typeQuery();
    // query += typeQuery();
    console.log(query)

    return next();
  } catch (err) {
    return next({
        log: `gqlController.convertToGQLSchema: ERROR: ${err}`,
        message: { err: 'Error occurred in gqlController.convertToGQLSchema. Check server log for more details.'},
        })
  }
};

function typeEachTabletTemplate(databases, name, pk_name, pk_type, fk_name, fk_ref_table) {
  let query = '';
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

  return query;
}



function typeQueryTemplate(databases, tableName, pk_name, pk_type, fk_name, fk_type, fk_ref_table) {
  let query = '';
  // write definitions for the table without foreign keys
  if (!fk_name) {
    query += `\n${tab}${tab}${tableName}${pk_name}(${pk_name}: ${pk_type}): [${tableName}]`;
    query += `\n${tab}${tab}All${tableName}: [${tableName}]`;
  } else { //assuming if not null, fk_name exists
    // pretreat fk_type
    let converted_fk_type = typeData(fk_type);
    // write definitions for the table with foreign keys
    query += `\n${tab}${tab}${tableName}${pk_name}(${pk_name}: ${pk_type}): [${tableName}]`;
    query += `\n${tab}${tab}All${tableName}: [${tableName}]`;
    query += `\n${tab}${tab}${tableName}_by_foreign_keys: [${tableName}]\n${tab}}`;
    query += `\n${tab}extend type Query {`;
    query += `\n${tab}${tab}${tableName}_by_foreign_keys(find: ${fk_ref_table}Find!): [${tableName}]\n${tab}}`;
    query += `\n${tab}input ${fk_ref_table}Find {`;
    query += `\n${tab}${tab}${fk_name}: ${converted_fk_type}!\n${tab}}`;
    query += '\n`';
  }
  // console.log(tableName,fk_name, fk_ref_table)
  return query;
}


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