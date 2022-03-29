const fs = require('fs');

const typeDefController = {};

const tab = `  `;

typeDefController.generateTypeDef = (req, res, next) => {
  try {
    // start with the empty string
    let query = '';
    const databases = res.locals.SQLSchema.tables;
    // console.log(databases);
    query +=
      "require('dotenv').config();\nconst { ApolloServer } = require('apollo-server');\nconst gql = require('graphql-tag');\n\nconst pg = require('pg');\nconst { Pool } = require('pg');\nconst db = new Pool({ connectionString: {target_link_URI} });\n\nconst typeDefs = gql`\n";

    function typeEachTable() {
      // pretreat the necessary data from EACH table
      for (const [tableName, props] of Object.entries(databases)) {
        const name = tableName; // users
        // PRIMARY KEYS
        const pk_name = databases[name].primaryKey;
        let pk_type = databases[name].columns[pk_name].dataType;
        if (pk_type === 'integer') {
          pk_type = 'ID!';
        } else {
          pk_type = typeData(pk_type);
        }
        // FOREIGN KEYS (assuming only 1fk per table)
        let fk_name = databases[name].foreignKeys; // if fk = null -> shows up as a string
        let fk_type = '';
        let fk_ref_table = '';
        if (fk_name) {
          // if not null
          // if fk exist -> find its name and reference table
          fk_name = Object.keys(fk_name)[0];
          fk_type = databases[name].columns[fk_name].dataType;
          fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable;
        }
        // build the typeDef per for EACH table
        query += typeEachTabletTemplate(databases, name, pk_name, pk_type, fk_name, fk_ref_table);
        query += `\n${tab}}`;
        query += '\n';
      }
    }
    function typeInput() {
      // pretreat the necessary data from EACH table
      for (const [tableName, props] of Object.entries(databases)) {
        const name = tableName; // users
        // FOREIGN KEYS (assuming only 1fk per table)
        let fk_name = databases[name].foreignKeys; // if foreign_keys: null || {}
        let fk_type = '';
        let fk_ref_table = '';
        if (fk_name) {
          // if not null
          // if fk exist -> find its name and reference table
          fk_name = Object.keys(fk_name)[0];
          fk_type = databases[name].columns[fk_name].dataType;
          fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable;

          // build out the input template string
          query += typeInputTemplate(fk_name, fk_type, fk_ref_table);
        }
      }
      query += '\n';
    }
    function typeQuery() {
      query += `\n${tab}type Query {`;

      // pretreat the necessary data from EACH table
      for (const [tableName, props] of Object.entries(databases)) {
        const name = tableName; // users
        // PRIMARY KEYS
        const pk_name = databases[name].primaryKey;
        let pk_type = databases[name].columns[pk_name].dataType;
        if (pk_type === 'integer') {
          pk_type = 'ID!';
        } else {
          pk_type = typeData(pk_type);
        }
        // FOREIGN KEYS (assuming only 1fk per table)
        let fk_name = databases[name].foreignKeys; // if fk = null -> shows up as a string
        let fk_type = '';
        let fk_ref_table = '';
        if (fk_name) {
          // if not null
          // if fk exist -> find its name and reference table
          fk_name = Object.keys(fk_name)[0];
          fk_type = databases[name].columns[fk_name].dataType;
          fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable;
        }

        // build the typeDef per for EACH table
        query += typeQueryTemplate(databases, tableName, pk_name, pk_type, fk_name, fk_type, fk_ref_table);
      }
      query += '\n}';
    }

    typeEachTable();
    typeInput();
    typeQuery();

    // close the typeDef with closing tick `
    query += '\n`;';
    // send to the response
    res.locals.typeDefs = query;
    // console.log(res.locals);
    return next();
  } catch (err) {
    return next({
      log: `gqlController.convertToGQLSchema: ERROR: ${err}`,
      message: {
        err: 'Error occurred in gqlController.convertToGQLSchema. Check server log for more details.',
      },
    });
  }
};

// write out typeDef strings for each table
function typeEachTabletTemplate(databases, name, pk_name, pk_type, fk_name, fk_ref_table) {
  let query = '';
  // concat the PK first -> output the query string
  query += `${tab}type ${name} {\n${tab}${tab}${pk_name}: ${pk_type}`;
  // concat the FK second -> output the query string
  if (fk_name === null) {
    query += '';
  } else {
    query += `\n${tab}${tab}${fk_name}: [${fk_ref_table}]`;
  }
  // loop through the rest of the columns
  const columns = databases[name].columns;
  for (column in columns) {
    if (column != pk_name && column != fk_name) {
      let column_type = columns[column].dataType;
      // format the datatype to gql
      column_type = typeData(column_type);
      // console.log(column,`converted: ${column_type}`,`table name: ${name}`)
      query += `\n${tab}${tab}${column}: ${column_type}`;
    }
  }
  codegenInput(query);
  // fs.appendFileSync('server/schemas/input/inputSchema.graphql', query, (err) => {
  //   if (err) console.log(err);
  //   else console.log('Written successfully');
  // }); // Frank - Leaving this here temporarily until I figure out where to put it
  return query;
}

function typeQueryTemplate(databases, tableName, pk_name, pk_type, fk_name, fk_type, fk_ref_table) {
  let query = '';
  // write definitions for the table without foreign keys
  if (!fk_name) {
    query += `\n${tab}${tab}${tableName}_by_${pk_name}(${pk_name}: ${pk_type}): [${tableName}]`;
    query += `\n${tab}${tab}All${tableName}: [${tableName}]`;
  } else {
    // assuming if not null, fk_name exists
    // pretreat fk_type
    const converted_fk_type = typeData(fk_type);
    // write definitions for the table with foreign keys
    query += `\n${tab}${tab}${tableName}_by_${pk_name}(${pk_name}: ${pk_type}): [${tableName}]`;
    query += `\n${tab}${tab}All${tableName}: [${tableName}]`;
    query += `\n${tab}${tab}${tableName}_by_foreign_keys(find: ${fk_ref_table}Find!): [${tableName}]`;
  }
  // console.log(tableName,fk_name, fk_ref_table)
  return query;
}

function typeInputTemplate(fk_name, fk_type, fk_ref_table) {
  let inputDefTemplate = '';
  const converted_fk_type = typeData(fk_type);
  if (fk_name) {
    inputDefTemplate += `\n${tab}input ${fk_ref_table}Find {`;
    inputDefTemplate += `\n${tab}${tab}${fk_name}: ${converted_fk_type}!`;
    inputDefTemplate += `\n${tab}}`;
  }
  return inputDefTemplate;
}

function codegenInput(query) {
  let newQuery = query;
  newQuery += `\n${tab}}`;
  newQuery += '\n';
  fs.appendFileSync('server/schemas/input/inputSchema.graphql', newQuery, (err) => {
    if (err) console.log(err);
    else console.log('Written successfully');
  }); // Frank - Leaving this here temporarily until I figure out where to put it
}

function typeData(sqlType) {
  const typeMatch = {
    integer: 'Int',
    real: 'Float',
    boolean: 'Boolean',
    text: 'String',
    date: 'String',
    varchar: 'String',
    char: 'String',
    bigint: 'Int',
    number: 'Int',
    int: 'Int',
  };

  const lowerCaseSqlType = sqlType.toLowerCase();
  if (lowerCaseSqlType === 'character varying') return 'String';
  if (lowerCaseSqlType === 'timestamp without time zone') return 'String';
  if (lowerCaseSqlType === 'double precision') return 'Float';
  if (typeMatch[lowerCaseSqlType]) return typeMatch[lowerCaseSqlType];
  return 'String';
}

module.exports = typeDefController;
