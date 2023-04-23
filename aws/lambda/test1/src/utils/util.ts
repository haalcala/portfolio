import fs from 'fs';

export const MY_CONST = "Hello from util.mjs"

export function readPackgeJson() {
    if (isRunningAsLambda()) {
        return JSON.parse(fs.readFileSync('./package.json') + "");
    }
    else {
        return JSON.parse(fs.readFileSync('../package.json)') + "");
    }
}

export function isRunningAsLambda() {
    return process.env.AWS_EXECUTION_ENV && process.env.AWS_EXECUTION_ENV.startsWith('AWS_Lambda_');
}
