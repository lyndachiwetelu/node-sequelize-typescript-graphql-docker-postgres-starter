import fs from 'fs'

const generateMigrationFile = (name: string, action: string, path:string) => {
    const fileName = `${Date.now()}__${action}_${name}.ts`
    const migrationTemplate = fs.readFileSync('src/templates/migration.ts');
    fs.appendFile(`${path}${fileName}`, migrationTemplate, function (err) {
      if (err) { 
        throw err;
      }
      console.log(`Migration ${fileName} is created!`);
    });
}

const name = process.argv[2]
const action = process.argv[3]
const migrationType = process.argv[4]

if (!name || !action) {
    console.log('USAGE:  yarn generate-migration modelName Action [--seed]')
}

const path = migrationType === '--seed' ? 'src/seeders/' : 'src/migrations/'

generateMigrationFile(name.toLowerCase(), action.toLowerCase(), path)