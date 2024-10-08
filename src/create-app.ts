#!/usr/bin/env node
import {App} from 'aws-cdk-lib';

import {RestApiStack} from './rest-api/stack.js';
import {CertificateStack} from './certificate/certificate.stack.js';
import {domainName, stage, subdomain} from './config.js';
import {VideoStack} from './video/stack.js';

const app = new App();

const certStack = new CertificateStack(app, `Video-App-Certificate-${stage}`, {
    stage,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'us-east-1'
    },
    crossRegionReferences: true,
    domainName,
    subdomain,
});

export const videoStorageStack = new VideoStack(app, `VideoStack-${stage}`, {
    stage
});

export const stack = new RestApiStack(app, `RestAPIStack-${stage}`, {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    crossRegionReferences: true,
    stage,
    certStack,
    domainName,
    subdomain,
    storageBucket: videoStorageStack.s3Bucket,
    storageBucketRegion: videoStorageStack.region,
});


