const { normalize } = require('path');
const dotenv = require('dotenv');
const { writeFile, existsSync } = require('fs');
const { argv } = require('yargs');

const CONFIG = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DIRECTORY: {
        src: './src'
    }
};

const getAbsolutePath = (path) => {
    const absolutePath = normalize(`${process.cwd()}/${path}`);

    if (!existsSync(absolutePath)) {
        console.error(`Unable to find ${path}`);
        process.exit(1);
    }

    return absolutePath;
};

const envPath = getAbsolutePath(`${CONFIG.DIRECTORY.src}/environments`);

dotenv.config({ path: `${envPath}/.env` });

const environment = argv.environment;

const isProduction = environment === 'prod';

const targetPath = isProduction ? `${envPath}/environment.prod.ts` : `${envPath}/environment.dev.ts`;

const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    leagueId: ${process.env.LEAGUE_ID},
    climaCellKey: '${process.env.CLIMACELL_KEY}'
};

`;

writeFile(targetPath, environmentFileContent, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});
