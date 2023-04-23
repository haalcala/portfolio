import * as shortid from 'shortid'

import * as util from "./utils/util.js"

const package_json = util.readPackgeJson();

export async function handler(event, context) {
    console.log({ event }, { context })

    // TODO implement
    const response = {
        statusCode: 200,

        body: JSON.stringify({
            id: shortid.generate(),
            NODE_ENV: process.env.NODE_ENV,
            msg: 'Hello from Lambda! ' + new Date().getTime(),
            event,
            context,
            MY_CONST: util.MY_CONST,
            version: package_json.version,
            MY_SETTINGS: process.env.MY_SETTINGS
        })
    };
    return response;
}

if (util.isRunningAsLambda()) {
    console.log('Running as a Lambda function');
} else {
    console.log('Running locally');

    console.log(handler({}, {}));
}
