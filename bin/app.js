#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { SampleStack } = require('../lib/sample-stack');

const app = new cdk.App();
new SampleStack(app, 'ApigatewayLambdaCustomIntegrationStack', {

});
