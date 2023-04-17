import * as util from "./util.mjs"

import * as shortid from 'shortid';

function isRunningAsLambda() {
    return process.env.AWS_EXECUTION_ENV && process.env.AWS_EXECUTION_ENV.startsWith('AWS_Lambda_');
}

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
        })
    };
    return response;
};


if (isRunningAsLambda()) {
    console.log('Running as a Lambda function');
} else {
    console.log('Running locally');

    console.log(handler({}, {}))
}
