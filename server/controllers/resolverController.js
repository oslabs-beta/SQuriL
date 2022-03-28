const resolverController = {};

const tab = `  `;

resolverController.generateResolvers = (req, res, next) => {
  try {
    const databases = res.locals.SQLSchema.tables;
    const { typeDefs } = res.locals;
    let resolvers = '\nconst resolvers = {\n  Query: {';

    // get necessary data to write query resolvers templates
    function queryResolvers() {
      for (const [tableName, props] of Object.entries(databases)) {
        let name = tableName; //users
        // PRIMARY KEYS
        let pk_name = databases[name].primaryKey;
        // FOREIGN KEYS (assuming only 1fk per table)
        let fk_name = databases[name].foreignKeys; //if fk = null -> shows up as a string
        // let fk_type = '';
        let fk_ref_table = '';
        if (fk_name) {
          // if not null
          // if fk exist -> find its name and reference table
          fk_name = Object.keys(fk_name)[0];
          // fk_type = databases[name].columns[fk_name].dataType;
          fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable;
        }

        resolvers += queryResolversTemplate(
          tableName,
          pk_name,
          fk_name,
          fk_ref_table
        );
      }
    }
    // get necessary data to write fields with foreign keys (to its relational pk table data)
    function foreignKeyFieldsResolvers() {
      for (const [tableName, props] of Object.entries(databases)) {
        let name = tableName; //users
        // FOREIGN KEYS (assuming only 1fk per table)
        let fk_name = databases[name].foreignKeys; //if fk = null -> shows up as a string
        // let fk_type = '';
        let fk_ref_table = '';
        let fk_ref_table_pk = '';
        if (fk_name) {
          // if not null
          // if fk exist -> find its name and reference table
          fk_name = Object.keys(fk_name)[0];
          // fk_type = databases[name].columns[fk_name].dataType;
          fk_ref_table = databases[name].foreignKeys[fk_name].referenceTable;
          fk_ref_table_pk = databases[name].foreignKeys[fk_name].referenceKey;
        }

        resolvers += fkResolversTemplate(
          tableName,
          fk_name,
          fk_ref_table,
          fk_ref_table_pk
        );
      }
    }
    // build query resolvers
    queryResolvers();
    // build fk fields resolvers
    foreignKeyFieldsResolvers();
    // close resolvers function
    resolvers += '\n};';
    // define the server and ports
    resolvers +=
      '\n\nconst server = new ApolloServer({\n typeDefs,\n resolvers,\n});\n\nconst PORT = {_port_number_};\nserver.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));';

    // console.log(resolvers);
    // combine typeDefs + resolvers and return
    const GQLschema = typeDefs + resolvers;
    res.locals.schema = GQLschema;
    console.log(GQLschema);
    return next();
  } catch (err) {
    return next({
      log: `resolverController.generateResolvers: ERROR: ${err}`,
      message: {
        err: 'Error occurred in resolverController.generateResolvers. Check server log for more details.',
      },
    });
  }
};

function queryResolversTemplate(tableName, pk_name, fk_name, fk_ref_table) {
  let resolver = '';
  if (!fk_name) {
    // resolver search by ID
    resolver += `\n${tab}${tab}${tableName}_by_${pk_name}: async (parent, args, context, info) => {\n${tab}${tab}${tab}try {\n${tab}${tab}${tab}${tab}const data = await db.query(\`SELECT * FROM ${tableName} WHERE ${pk_name}='\${args.${pk_name}}'\`);\n${tab}${tab}${tab}${tab}return data.rows;\n${tab}${tab}${tab}} catch (error) {\n${tab}${tab}${tab}${tab}throw new Error(error);\n${tab}${tab}${tab}}\n${tab}${tab}},`;

    // resolver to output all table data
    resolver += `\n${tab}${tab}All${tableName}: async (parent, args, context, info) => {\n${tab}${tab}${tab}try {\n${tab}${tab}${tab}${tab}const data = await db.query('SELECT * FROM ${tableName}');\n${tab}${tab}${tab}${tab}return data.rows;\n${tab}${tab}${tab}} catch (error) {\n${tab}${tab}${tab}${tab}throw new Error(error);\n${tab}${tab}${tab}}\n${tab}${tab}},`;
  } else {
    resolver += `\n${tab}${tab}${tableName}_by_${pk_name}: async (parent, args, context, info) => {\n${tab}${tab}${tab}try {\n${tab}${tab}${tab}${tab}const data = await db.query(\`SELECT * FROM ${tableName} WHERE ${pk_name}='\${args.${pk_name}}'\`);\n${tab}${tab}${tab}${tab}return data.rows;\n${tab}${tab}${tab}} catch (error) {\n${tab}${tab}${tab}${tab}throw new Error(error);\n${tab}${tab}${tab}}\n${tab}${tab}},`;

    // resolver to output all table data
    resolver += `\n${tab}${tab}All${tableName}: async (parent, args, context, info) => {\n${tab}${tab}${tab}try {\n${tab}${tab}${tab}${tab}const data = await db.query('SELECT * FROM ${tableName}');\n${tab}${tab}${tab}${tab}return data.rows;\n${tab}${tab}${tab}} catch (error) {\n${tab}${tab}${tab}${tab}throw new Error(error);\n${tab}${tab}${tab}}\n${tab}${tab}},`;

    // resolver to search the table by their foreign keys
    resolver += `\n${tab}${tab}${tableName}_by_foreign_keys: async (parent, args, context, info) => {\n${tab}${tab}${tab}const { find } = args;\n${tab}${tab}${tab}try {\n${tab}${tab}${tab}${tab}const data = await db.query(\`SELECT * FROM ${tableName} WHERE ${fk_name}='\${find.${fk_name}}'\`);\n${tab}${tab}${tab}${tab}return data.rows;\n${tab}${tab}${tab}} catch (error) {\n${tab}${tab}${tab}${tab}throw new Error(error);\n${tab}${tab}${tab}}\n${tab}${tab}},`;
  }
  return resolver;
}

function fkResolversTemplate(
  tableName,
  fk_name,
  fk_ref_table,
  fk_ref_table_pk
) {
  resolver = '';
  if (fk_name) {
    resolver += `\n${tab}${tableName}: {\n${tab}${tab}${fk_name}: async (parent, args, context, info) => {\n${tab}${tab}${tab}try {\n${tab}${tab}${tab}${tab}const data = await db.query(\`SELECT * FROM ${fk_ref_table} WHERE ${fk_ref_table_pk}='\${parent.${fk_name}}'\`);\n${tab}${tab}${tab}${tab}return data.rows;\n${tab}${tab}${tab}} catch (error) {\n${tab}${tab}${tab}${tab}throw new Error(error);\n${tab}${tab}${tab}}\n${tab}${tab}},\n${tab}},`;
  }
  return resolver;
}

module.exports = resolverController;
