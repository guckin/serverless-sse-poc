import {
    APIGatewayProxyEventV2,
    APIGatewayProxyResultV2
} from 'aws-lambda';
import {presignedUpload} from '../utils/presigned-upload.js';
import {storageBucketName, storageBucketRegion} from './config.js';
import {getMillisecondsAfterSeconds} from '../utils/time.js';

 export type Handler = (event: APIGatewayProxyEventV2) => Promise<APIGatewayProxyResultV2>;


const createUploadUrl: Handler = async () => {
    const id = Math.random().toString(36).substring(7);
    const fiveMinutes = 60 * 5;
    const ttl = getMillisecondsAfterSeconds(fiveMinutes);
    const method = 'POST';
    const url = presignedUpload({
        bucket: storageBucketName,
        region: storageBucketRegion,
        key: id,
        expiresIn: fiveMinutes,
        method
    });
    return {
        statusCode: 200,
        body: JSON.stringify({
            method,
            url,
            ttl
        }),
    };
}

export const handler: Handler = async event => {
    if (event.requestContext.http.method === 'GET' && event.rawPath === '/upload') {
        return createUploadUrl(event);
    }
    else {
        return {
            statusCode: 404,
            body: JSON.stringify({message: 'Not found'}),
        };
    }
}
