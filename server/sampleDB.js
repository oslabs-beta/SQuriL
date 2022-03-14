export const SampleGQLServerCode =
  "const graphql = require('graphql');\nconst pool = require('../db/zopukfce/sql_pool.js');\n\nconst { \n  GraphQLObjectType,\n  GraphQLSchema,\n  GraphQLID,\n  GraphQLString, \n  GraphQLInt, \n  GraphQLBoolean,\n  GraphQLList,\n  GraphQLNonNull\n} = graphql;\n  \nconst regionsType = new GraphQLObjectType({\n  name: 'regions',\n  fields: () => ({\n    region_id: { type: GraphQLInt },\n    region_name: { type: GraphQLString }\n  })\n});\n\nconst countriesType = new GraphQLObjectType({\n  name: 'countries',\n  fields: () => ({\n    region_id: { type: GraphQLInt },\n    country_name: { type: GraphQLString },\n    country_id: { type: GraphQLString }\n  })\n});\n\nconst locationsType = new GraphQLObjectType({\n  name: 'locations',\n  fields: () => ({\n    location_id: { type: GraphQLInt },\n    country_id: { type: GraphQLString },\n    state_province: { type: GraphQLString },\n    city: { type: GraphQLString },\n    postal_code: { type: GraphQLString },\n    street_address: { type: GraphQLString }\n  })\n});\n\nconst departmentsType = new GraphQLObjectType({\n  name: 'departments',\n  fields: () => ({\n    location_id: { type: GraphQLInt },\n    department_id: { type: GraphQLInt },\n    department_name: { type: GraphQLString }\n  })\n});\n\nconst jobsType = new GraphQLObjectType({\n  name: 'jobs',\n  fields: () => ({\n    max_salary: { type: GraphQLString },\n    job_title: { type: GraphQLString },\n    min_salary: { type: GraphQLString },\n    job_id: { type: GraphQLInt }\n  })\n});\n\nconst employeesType = new GraphQLObjectType({\n  name: 'employees',\n  fields: () => ({\n    email: { type: GraphQLString },\n    hire_date: { type: GraphQLString },\n    job_id: { type: GraphQLInt },\n    salary: { type: GraphQLString },\n    employee_id: { type: GraphQLInt },\n    department_id: { type: GraphQLInt },\n    manager_id: { type: GraphQLInt },\n    first_name: { type: GraphQLString },\n    last_name: { type: GraphQLString },\n    phone_number: { type: GraphQLString }\n  })\n});\n\nconst dependentsType = new GraphQLObjectType({\n  name: 'dependents',\n  fields: () => ({\n    first_name: { type: GraphQLString },\n    dependent_id: { type: GraphQLInt },\n    relationship: { type: GraphQLString },\n    last_name: { type: GraphQLString },\n    employee_id: { type: GraphQLInt }\n  })\n});\n\nconst RootQuery = new GraphQLObjectType({\n  name: 'RootQueryType',\n  fields: {\n    everyRegions: {\n      type: new GraphQLList(regionsType),\n      resolve() {\n        const sql = `SELECT * FROM \"regions\";`\n        return pool.query(sql)\n          .then(res => res.rows)\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    regions: {\n      type: regionsType,\n      args: { region_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `SELECT * FROM \"regions\" WHERE region_id = '${args.id}';`;\n        return pool.query(sql)\n          .then(res => res.rows[0])\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    everyCountries: {\n      type: new GraphQLList(countriesType),\n      resolve() {\n        const sql = `SELECT * FROM \"countries\";`\n        return pool.query(sql)\n          .then(res => res.rows)\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    countries: {\n      type: countriesType,\n      args: { region_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `SELECT * FROM \"countries\" WHERE region_id = '${args.id}';`;\n        return pool.query(sql)\n          .then(res => res.rows[0])\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    everyLocations: {\n      type: new GraphQLList(locationsType),\n      resolve() {\n        const sql = `SELECT * FROM \"locations\";`\n        return pool.query(sql)\n          .then(res => res.rows)\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    locations: {\n      type: locationsType,\n      args: { location_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `SELECT * FROM \"locations\" WHERE location_id = '${args.id}';`;\n        return pool.query(sql)\n          .then(res => res.rows[0])\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    everyDepartments: {\n      type: new GraphQLList(departmentsType),\n      resolve() {\n        const sql = `SELECT * FROM \"departments\";`\n        return pool.query(sql)\n          .then(res => res.rows)\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    departments: {\n      type: departmentsType,\n      args: { location_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `SELECT * FROM \"departments\" WHERE location_id = '${args.id}';`;\n        return pool.query(sql)\n          .then(res => res.rows[0])\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    everyJobs: {\n      type: new GraphQLList(jobsType),\n      resolve() {\n        const sql = `SELECT * FROM \"jobs\";`\n        return pool.query(sql)\n          .then(res => res.rows)\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    jobs: {\n      type: jobsType,\n      args: { max_salary: { type: GraphQLString}},\n      resolve(parent, args) {\n        const sql = `SELECT * FROM \"jobs\" WHERE max_salary = '${args.id}';`;\n        return pool.query(sql)\n          .then(res => res.rows[0])\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    everyEmployees: {\n      type: new GraphQLList(employeesType),\n      resolve() {\n        const sql = `SELECT * FROM \"employees\";`\n        return pool.query(sql)\n          .then(res => res.rows)\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    employees: {\n      type: employeesType,\n      args: { email: { type: GraphQLString}},\n      resolve(parent, args) {\n        const sql = `SELECT * FROM \"employees\" WHERE email = '${args.id}';`;\n        return pool.query(sql)\n          .then(res => res.rows[0])\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    everyDependents: {\n      type: new GraphQLList(dependentsType),\n      resolve() {\n        const sql = `SELECT * FROM \"dependents\";`\n        return pool.query(sql)\n          .then(res => res.rows)\n          .catch(err => console.log('Error: ', err))\n      }\n    },\n    dependents: {\n      type: dependentsType,\n      args: { first_name: { type: GraphQLString}},\n      resolve(parent, args) {\n        const sql = `SELECT * FROM \"dependents\" WHERE first_name = '${args.id}';`;\n        return pool.query(sql)\n          .then(res => res.rows[0])\n          .catch(err => console.log('Error: ', err))\n      }\n    }\n  }\n});\n\nconst Mutation = new GraphQLObjectType({\n  name: 'Mutation',\n  fields: {\n    addregions: {\n      type: regionsType,\n      args: {\n        region_id: { type: GraphQLInt },\n        region_name: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        const columns = Object.keys(args).map(el => `\"${el}\"`);\n        const values = Object.values(args).map(el => `'${el}'`);\n        const sql = `INSERT INTO \"regions\" (${columns}) VALUES (${values}) RETURNING *`;\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    updateregions: {\n      type: regionsType,\n      args: {\n        region_id: { type: GraphQLInt },\n        region_name: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        let updateValues = '';\n        for (const prop in args) {\n          if (updateValues.length > 0) updateValues += `, `;\n          updateValues += `\"${prop}\" = '${args[prop]}' `;\n        }\n        const sql = `UPDATE \"regions\" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    deleteregions: {\n      type: regionsType,\n      args: { region_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `DELETE FROM \"regions\" WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    addcountries: {\n      type: countriesType,\n      args: {\n        region_id: { type: GraphQLInt },\n        country_name: { type: GraphQLString },\n        country_id: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        const columns = Object.keys(args).map(el => `\"${el}\"`);\n        const values = Object.values(args).map(el => `'${el}'`);\n        const sql = `INSERT INTO \"countries\" (${columns}) VALUES (${values}) RETURNING *`;\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    updatecountries: {\n      type: countriesType,\n      args: {\n        region_id: { type: GraphQLInt },\n        country_name: { type: GraphQLString },\n        country_id: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        let updateValues = '';\n        for (const prop in args) {\n          if (updateValues.length > 0) updateValues += `, `;\n          updateValues += `\"${prop}\" = '${args[prop]}' `;\n        }\n        const sql = `UPDATE \"countries\" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    deletecountries: {\n      type: countriesType,\n      args: { region_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `DELETE FROM \"countries\" WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    addlocations: {\n      type: locationsType,\n      args: {\n        location_id: { type: GraphQLInt },\n        country_id: { type: GraphQLString },\n        state_province: { type: GraphQLString },\n        city: { type: GraphQLString },\n        postal_code: { type: GraphQLString },\n        street_address: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        const columns = Object.keys(args).map(el => `\"${el}\"`);\n        const values = Object.values(args).map(el => `'${el}'`);\n        const sql = `INSERT INTO \"locations\" (${columns}) VALUES (${values}) RETURNING *`;\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    updatelocations: {\n      type: locationsType,\n      args: {\n        location_id: { type: GraphQLInt },\n        country_id: { type: GraphQLString },\n        state_province: { type: GraphQLString },\n        city: { type: GraphQLString },\n        postal_code: { type: GraphQLString },\n        street_address: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        let updateValues = '';\n        for (const prop in args) {\n          if (updateValues.length > 0) updateValues += `, `;\n          updateValues += `\"${prop}\" = '${args[prop]}' `;\n        }\n        const sql = `UPDATE \"locations\" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    deletelocations: {\n      type: locationsType,\n      args: { location_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `DELETE FROM \"locations\" WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    adddepartments: {\n      type: departmentsType,\n      args: {\n        location_id: { type: GraphQLInt },\n        department_id: { type: GraphQLInt },\n        department_name: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        const columns = Object.keys(args).map(el => `\"${el}\"`);\n        const values = Object.values(args).map(el => `'${el}'`);\n        const sql = `INSERT INTO \"departments\" (${columns}) VALUES (${values}) RETURNING *`;\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    updatedepartments: {\n      type: departmentsType,\n      args: {\n        location_id: { type: GraphQLInt },\n        department_id: { type: GraphQLInt },\n        department_name: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        let updateValues = '';\n        for (const prop in args) {\n          if (updateValues.length > 0) updateValues += `, `;\n          updateValues += `\"${prop}\" = '${args[prop]}' `;\n        }\n        const sql = `UPDATE \"departments\" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    deletedepartments: {\n      type: departmentsType,\n      args: { location_id: { type: GraphQLInt}},\n      resolve(parent, args) {\n        const sql = `DELETE FROM \"departments\" WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    addjobs: {\n      type: jobsType,\n      args: {\n        max_salary: { type: GraphQLString },\n        job_title: { type: GraphQLString },\n        min_salary: { type: GraphQLString },\n        job_id: { type: GraphQLInt }\n      },\n      resolve(parent, args) {\n        const columns = Object.keys(args).map(el => `\"${el}\"`);\n        const values = Object.values(args).map(el => `'${el}'`);\n        const sql = `INSERT INTO \"jobs\" (${columns}) VALUES (${values}) RETURNING *`;\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    updatejobs: {\n      type: jobsType,\n      args: {\n        max_salary: { type: GraphQLString },\n        job_title: { type: GraphQLString },\n        min_salary: { type: GraphQLString },\n        job_id: { type: GraphQLInt }\n      },\n      resolve(parent, args) {\n        let updateValues = '';\n        for (const prop in args) {\n          if (updateValues.length > 0) updateValues += `, `;\n          updateValues += `\"${prop}\" = '${args[prop]}' `;\n        }\n        const sql = `UPDATE \"jobs\" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    deletejobs: {\n      type: jobsType,\n      args: { max_salary: { type: GraphQLString}},\n      resolve(parent, args) {\n        const sql = `DELETE FROM \"jobs\" WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    addemployees: {\n      type: employeesType,\n      args: {\n        email: { type: GraphQLString },\n        hire_date: { type: GraphQLString },\n        job_id: { type: GraphQLInt },\n        salary: { type: GraphQLString },\n        employee_id: { type: GraphQLInt },\n        department_id: { type: GraphQLInt },\n        manager_id: { type: GraphQLInt },\n        first_name: { type: GraphQLString },\n        last_name: { type: GraphQLString },\n        phone_number: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        const columns = Object.keys(args).map(el => `\"${el}\"`);\n        const values = Object.values(args).map(el => `'${el}'`);\n        const sql = `INSERT INTO \"employees\" (${columns}) VALUES (${values}) RETURNING *`;\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    updateemployees: {\n      type: employeesType,\n      args: {\n        email: { type: GraphQLString },\n        hire_date: { type: GraphQLString },\n        job_id: { type: GraphQLInt },\n        salary: { type: GraphQLString },\n        employee_id: { type: GraphQLInt },\n        department_id: { type: GraphQLInt },\n        manager_id: { type: GraphQLInt },\n        first_name: { type: GraphQLString },\n        last_name: { type: GraphQLString },\n        phone_number: { type: GraphQLString }\n      },\n      resolve(parent, args) {\n        let updateValues = '';\n        for (const prop in args) {\n          if (updateValues.length > 0) updateValues += `, `;\n          updateValues += `\"${prop}\" = '${args[prop]}' `;\n        }\n        const sql = `UPDATE \"employees\" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    deleteemployees: {\n      type: employeesType,\n      args: { email: { type: GraphQLString}},\n      resolve(parent, args) {\n        const sql = `DELETE FROM \"employees\" WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    adddependents: {\n      type: dependentsType,\n      args: {\n        first_name: { type: GraphQLString },\n        dependent_id: { type: GraphQLInt },\n        relationship: { type: GraphQLString },\n        last_name: { type: GraphQLString },\n        employee_id: { type: GraphQLInt }\n      },\n      resolve(parent, args) {\n        const columns = Object.keys(args).map(el => `\"${el}\"`);\n        const values = Object.values(args).map(el => `'${el}'`);\n        const sql = `INSERT INTO \"dependents\" (${columns}) VALUES (${values}) RETURNING *`;\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    updatedependents: {\n      type: dependentsType,\n      args: {\n        first_name: { type: GraphQLString },\n        dependent_id: { type: GraphQLInt },\n        relationship: { type: GraphQLString },\n        last_name: { type: GraphQLString },\n        employee_id: { type: GraphQLInt }\n      },\n      resolve(parent, args) {\n        let updateValues = '';\n        for (const prop in args) {\n          if (updateValues.length > 0) updateValues += `, `;\n          updateValues += `\"${prop}\" = '${args[prop]}' `;\n        }\n        const sql = `UPDATE \"dependents\" SET ${updateValues} WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    },\n    deletedependents: {\n      type: dependentsType,\n      args: { first_name: { type: GraphQLString}},\n      resolve(parent, args) {\n        const sql = `DELETE FROM \"dependents\" WHERE id = '${args.id}' RETURNING *;`\n        return pool.connect()\n          .then(client => {\n            return client.query(sql)\n              .then(res => {\n                client.release();\n                return res.rows[0];\n              })\n              .catch(err => {\n                client.release();\n                console.log('Error: ', err);\n              })\n          })\n      }\n    }\n  }\n});\n\nmodule.exports = new GraphQLSchema({\n  query: RootQuery,\n  mutation: Mutation\n});";

export const SampleGQLClientQueriesCode =
  "import { gql } from 'apollo-boost';\n\nconst queryEveryregions = gql`\n  {\n    everyRegions {\n      region_id\n      region_name\n    }\n  }\n`\n\nconst queryregionsById = gql`\n  query($region_id: Number!) {\n    regions(region_id: $region_id) {\n      region_id\n      region_name\n    }\n  }\n`\n\nconst queryEverycountries = gql`\n  {\n    everyCountries {\n      region_id\n      country_name\n      country_id\n    }\n  }\n`\n\nconst querycountriesById = gql`\n  query($region_id: Number!) {\n    countries(region_id: $region_id) {\n      region_id\n      country_name\n      country_id\n    }\n  }\n`\n\nconst queryEverylocations = gql`\n  {\n    everyLocations {\n      location_id\n      country_id\n      state_province\n      city\n      postal_code\n      street_address\n    }\n  }\n`\n\nconst querylocationsById = gql`\n  query($location_id: Number!) {\n    locations(location_id: $location_id) {\n      location_id\n      country_id\n      state_province\n      city\n      postal_code\n      street_address\n    }\n  }\n`\n\nconst queryEverydepartments = gql`\n  {\n    everyDepartments {\n      location_id\n      department_id\n      department_name\n    }\n  }\n`\n\nconst querydepartmentsById = gql`\n  query($location_id: Number!) {\n    departments(location_id: $location_id) {\n      location_id\n      department_id\n      department_name\n    }\n  }\n`\n\nconst queryEveryjobs = gql`\n  {\n    everyJobs {\n      max_salary\n      job_title\n      min_salary\n      job_id\n    }\n  }\n`\n\nconst queryjobsById = gql`\n  query($max_salary: numeric!) {\n    jobs(max_salary: $max_salary) {\n      max_salary\n      job_title\n      min_salary\n      job_id\n    }\n  }\n`\n\nconst queryEveryemployees = gql`\n  {\n    everyEmployees {\n      email\n      hire_date\n      job_id\n      salary\n      employee_id\n      department_id\n      manager_id\n      first_name\n      last_name\n      phone_number\n    }\n  }\n`\n\nconst queryemployeesById = gql`\n  query($email: character varying!) {\n    employees(email: $email) {\n      email\n      hire_date\n      job_id\n      salary\n      employee_id\n      department_id\n      manager_id\n      first_name\n      last_name\n      phone_number\n    }\n  }\n`\n\nconst queryEverydependents = gql`\n  {\n    everyDependents {\n      first_name\n      dependent_id\n      relationship\n      last_name\n      employee_id\n    }\n  }\n`\n\nconst querydependentsById = gql`\n  query($first_name: character varying!) {\n    dependents(first_name: $first_name) {\n      first_name\n      dependent_id\n      relationship\n      last_name\n      employee_id\n    }\n  }\n`\n\nexport { queryEveryregions, queryregionsById , queryEverycountries, querycountriesById , queryEverylocations, querylocationsById , queryEverydepartments, querydepartmentsById , queryEveryjobs, queryjobsById , queryEveryemployees, queryemployeesById , queryEverydependents, querydependentsById };";

export const SampleGQLClientMutationsCode =
  "import { gql } from 'apollo-boost';\n\nconst addregionsMutation = gql`\n  mutation($region_name: character varying) {\n    addregions(region_name: $region_name) {\n      region_id\n      region_name\n    }\n  }\n`\n\nconst updateregionsMutation = gql`\n  mutation($region_id: Number!, $region_name: character varying) {\n    updateregions(region_id: $region_id, region_name: $region_name) {\n      region_id\n      region_name\n    }\n  }\n`\n\nconst deleteregionsMutation = gql`\n  mutation($region_id: Number!){\n    deleteregions(region_id: $region_id){\n      region_id\n      region_name\n    }\n  }\n`\n\nconst addcountriesMutation = gql`\n  mutation($country_name: character varying, $country_id: character) {\n    addcountries(country_name: $country_name, country_id: $country_id) {\n      region_id\n      country_name\n      country_id\n    }\n  }\n`\n\nconst updatecountriesMutation = gql`\n  mutation($region_id: Number!, $country_name: character varying, $country_id: character) {\n    updatecountries(region_id: $region_id, country_name: $country_name, country_id: $country_id) {\n      region_id\n      country_name\n      country_id\n    }\n  }\n`\n\nconst deletecountriesMutation = gql`\n  mutation($region_id: Number!){\n    deletecountries(region_id: $region_id){\n      region_id\n      country_name\n      country_id\n    }\n  }\n`\n\nconst addlocationsMutation = gql`\n  mutation($country_id: character, $state_province: character varying, $city: character varying, $postal_code: character varying, $street_address: character varying) {\n    addlocations(country_id: $country_id, state_province: $state_province, city: $city, postal_code: $postal_code, street_address: $street_address) {\n      location_id\n      country_id\n      state_province\n      city\n      postal_code\n      street_address\n    }\n  }\n`\n\nconst updatelocationsMutation = gql`\n  mutation($location_id: Number!, $country_id: character, $state_province: character varying, $city: character varying, $postal_code: character varying, $street_address: character varying) {\n    updatelocations(location_id: $location_id, country_id: $country_id, state_province: $state_province, city: $city, postal_code: $postal_code, street_address: $street_address) {\n      location_id\n      country_id\n      state_province\n      city\n      postal_code\n      street_address\n    }\n  }\n`\n\nconst deletelocationsMutation = gql`\n  mutation($location_id: Number!){\n    deletelocations(location_id: $location_id){\n      location_id\n      country_id\n      state_province\n      city\n      postal_code\n      street_address\n    }\n  }\n`\n\nconst adddepartmentsMutation = gql`\n  mutation($department_id: Int, $department_name: character varying) {\n    adddepartments(department_id: $department_id, department_name: $department_name) {\n      location_id\n      department_id\n      department_name\n    }\n  }\n`\n\nconst updatedepartmentsMutation = gql`\n  mutation($location_id: Number!, $department_id: Int, $department_name: character varying) {\n    updatedepartments(location_id: $location_id, department_id: $department_id, department_name: $department_name) {\n      location_id\n      department_id\n      department_name\n    }\n  }\n`\n\nconst deletedepartmentsMutation = gql`\n  mutation($location_id: Number!){\n    deletedepartments(location_id: $location_id){\n      location_id\n      department_id\n      department_name\n    }\n  }\n`\n\nconst addjobsMutation = gql`\n  mutation($job_title: character varying, $min_salary: numeric, $job_id: Int) {\n    addjobs(job_title: $job_title, min_salary: $min_salary, job_id: $job_id) {\n      max_salary\n      job_title\n      min_salary\n      job_id\n    }\n  }\n`\n\nconst updatejobsMutation = gql`\n  mutation($max_salary: numeric!, $job_title: character varying, $min_salary: numeric, $job_id: Int) {\n    updatejobs(max_salary: $max_salary, job_title: $job_title, min_salary: $min_salary, job_id: $job_id) {\n      max_salary\n      job_title\n      min_salary\n      job_id\n    }\n  }\n`\n\nconst deletejobsMutation = gql`\n  mutation($max_salary: numeric!){\n    deletejobs(max_salary: $max_salary){\n      max_salary\n      job_title\n      min_salary\n      job_id\n    }\n  }\n`\n\nconst addemployeesMutation = gql`\n  mutation($hire_date: date, $job_id: Int, $salary: numeric, $employee_id: Int, $department_id: Int, $manager_id: Int, $first_name: character varying, $last_name: character varying, $phone_number: character varying) {\n    addemployees(hire_date: $hire_date, job_id: $job_id, salary: $salary, employee_id: $employee_id, department_id: $department_id, manager_id: $manager_id, first_name: $first_name, last_name: $last_name, phone_number: $phone_number) {\n      email\n      hire_date\n      job_id\n      salary\n      employee_id\n      department_id\n      manager_id\n      first_name\n      last_name\n      phone_number\n    }\n  }\n`\n\nconst updateemployeesMutation = gql`\n  mutation($email: character varying!, $hire_date: date, $job_id: Int, $salary: numeric, $employee_id: Int, $department_id: Int, $manager_id: Int, $first_name: character varying, $last_name: character varying, $phone_number: character varying) {\n    updateemployees(email: $email, hire_date: $hire_date, job_id: $job_id, salary: $salary, employee_id: $employee_id, department_id: $department_id, manager_id: $manager_id, first_name: $first_name, last_name: $last_name, phone_number: $phone_number) {\n      email\n      hire_date\n      job_id\n      salary\n      employee_id\n      department_id\n      manager_id\n      first_name\n      last_name\n      phone_number\n    }\n  }\n`\n\nconst deleteemployeesMutation = gql`\n  mutation($email: character varying!){\n    deleteemployees(email: $email){\n      email\n      hire_date\n      job_id\n      salary\n      employee_id\n      department_id\n      manager_id\n      first_name\n      last_name\n      phone_number\n    }\n  }\n`\n\nconst adddependentsMutation = gql`\n  mutation($dependent_id: Int, $relationship: character varying, $last_name: character varying, $employee_id: Int) {\n    adddependents(dependent_id: $dependent_id, relationship: $relationship, last_name: $last_name, employee_id: $employee_id) {\n      first_name\n      dependent_id\n      relationship\n      last_name\n      employee_id\n    }\n  }\n`\n\nconst updatedependentsMutation = gql`\n  mutation($first_name: character varying!, $dependent_id: Int, $relationship: character varying, $last_name: character varying, $employee_id: Int) {\n    updatedependents(first_name: $first_name, dependent_id: $dependent_id, relationship: $relationship, last_name: $last_name, employee_id: $employee_id) {\n      first_name\n      dependent_id\n      relationship\n      last_name\n      employee_id\n    }\n  }\n`\n\nconst deletedependentsMutation = gql`\n  mutation($first_name: character varying!){\n    deletedependents(first_name: $first_name){\n      first_name\n      dependent_id\n      relationship\n      last_name\n      employee_id\n    }\n  }\n`\n\nexport {\n  addregionsMutation,\n  updateregionsMutation,\n  deleteregionsMutation,\n  addcountriesMutation,\n  updatecountriesMutation,\n  deletecountriesMutation,\n  addlocationsMutation,\n  updatelocationsMutation,\n  deletelocationsMutation,\n  adddepartmentsMutation,\n  updatedepartmentsMutation,\n  deletedepartmentsMutation,\n  addjobsMutation,\n  updatejobsMutation,\n  deletejobsMutation,\n  addemployeesMutation,\n  updateemployeesMutation,\n  deleteemployeesMutation,\n  adddependentsMutation,\n  updatedependentsMutation,\n  deletedependentsMutation,\n};";

export const SQLSchema = {
  name: 'Sample Database',
  tables: {
    regions: {
      primaryKey: 'region_id',
      foreignKeys: null,
      referencedBy: {
        countries: 'region_id',
      },
      columns: {
        region_id: {
          dataType: 'integer',
          columnDefault: "nextval('regions_region_id_seq'::regclass)",
          charMaxLength: null,
          isNullable: 'NO',
        },
        region_name: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 25,
          isNullable: 'YES',
        },
      },
    },
    countries: {
      primaryKey: 'country_id',
      foreignKeys: {
        region_id: {
          referenceTable: 'regions',
          referenceKey: 'region_id',
        },
      },
      referencedBy: {
        locations: 'country_id',
      },
      columns: {
        region_id: {
          dataType: 'integer',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'NO',
        },
        country_name: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 40,
          isNullable: 'YES',
        },
        country_id: {
          dataType: 'character',
          columnDefault: null,
          charMaxLength: 2,
          isNullable: 'NO',
        },
      },
    },
    locations: {
      primaryKey: 'location_id',
      foreignKeys: {
        country_id: {
          referenceTable: 'countries',
          referenceKey: 'country_id',
        },
      },
      referencedBy: {
        departments: 'location_id',
      },
      columns: {
        location_id: {
          dataType: 'integer',
          columnDefault: "nextval('locations_location_id_seq'::regclass)",
          charMaxLength: null,
          isNullable: 'NO',
        },
        country_id: {
          dataType: 'character',
          columnDefault: null,
          charMaxLength: 2,
          isNullable: 'NO',
        },
        state_province: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 25,
          isNullable: 'YES',
        },
        city: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 30,
          isNullable: 'NO',
        },
        postal_code: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 12,
          isNullable: 'YES',
        },
        street_address: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 40,
          isNullable: 'YES',
        },
      },
    },
    departments: {
      primaryKey: 'department_id',
      foreignKeys: {
        location_id: {
          referenceTable: 'locations',
          referenceKey: 'location_id',
        },
      },
      referencedBy: {
        employees: 'department_id',
      },
      columns: {
        location_id: {
          dataType: 'integer',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'YES',
        },
        department_id: {
          dataType: 'integer',
          columnDefault: "nextval('departments_department_id_seq'::regclass)",
          charMaxLength: null,
          isNullable: 'NO',
        },
        department_name: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 30,
          isNullable: 'NO',
        },
      },
    },
    jobs: {
      primaryKey: 'job_id',
      foreignKeys: null,
      referencedBy: {
        employees: 'job_id',
      },
      columns: {
        max_salary: {
          dataType: 'numeric',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'YES',
        },
        job_title: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 35,
          isNullable: 'NO',
        },
        min_salary: {
          dataType: 'numeric',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'YES',
        },
        job_id: {
          dataType: 'integer',
          columnDefault: "nextval('jobs_job_id_seq'::regclass)",
          charMaxLength: null,
          isNullable: 'NO',
        },
      },
    },
    employees: {
      primaryKey: 'employee_id',
      foreignKeys: {
        job_id: {
          referenceTable: 'jobs',
          referenceKey: 'job_id',
        },
        department_id: {
          referenceTable: 'departments',
          referenceKey: 'department_id',
        },
        manager_id: {
          referenceTable: 'employees',
          referenceKey: 'employee_id',
        },
      },
      referencedBy: {
        employees: 'manager_id',
        dependents: 'employee_id',
      },
      columns: {
        email: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 100,
          isNullable: 'NO',
        },
        hire_date: {
          dataType: 'date',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'NO',
        },
        job_id: {
          dataType: 'integer',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'NO',
        },
        salary: {
          dataType: 'numeric',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'NO',
        },
        employee_id: {
          dataType: 'integer',
          columnDefault: "nextval('employees_employee_id_seq'::regclass)",
          charMaxLength: null,
          isNullable: 'NO',
        },
        department_id: {
          dataType: 'integer',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'YES',
        },
        manager_id: {
          dataType: 'integer',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'YES',
        },
        first_name: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 20,
          isNullable: 'YES',
        },
        last_name: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 25,
          isNullable: 'NO',
        },
        phone_number: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 20,
          isNullable: 'YES',
        },
      },
    },
    dependents: {
      primaryKey: 'dependent_id',
      foreignKeys: {
        employee_id: {
          referenceTable: 'employees',
          referenceKey: 'employee_id',
        },
      },
      referencedBy: null,
      columns: {
        first_name: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 50,
          isNullable: 'NO',
        },
        dependent_id: {
          dataType: 'integer',
          columnDefault: "nextval('dependents_dependent_id_seq'::regclass)",
          charMaxLength: null,
          isNullable: 'NO',
        },
        relationship: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 25,
          isNullable: 'NO',
        },
        last_name: {
          dataType: 'character varying',
          columnDefault: null,
          charMaxLength: 50,
          isNullable: 'NO',
        },
        employee_id: {
          dataType: 'integer',
          columnDefault: null,
          charMaxLength: null,
          isNullable: 'NO',
        },
      },
    },
  },
};

// module.exports = { GQLServerCode, GQLClientQueriesCode, GQLClientMutationsCode };
