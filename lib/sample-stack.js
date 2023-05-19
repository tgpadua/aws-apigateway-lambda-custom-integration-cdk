const {Stack} = require('aws-cdk-lib');
const {ApigatewayLambdaCustomIntegrationConstruct} = require("./apigateway-lambda-custom-integration-construct");

class SampleStack extends Stack {
    /**
     *
     * @param {Construct} scope
     * @param {string} id
     * @param {StackProps=} props
     */
    constructor(scope, id, props) {
        super(scope, id, props);

        const construct = new ApigatewayLambdaCustomIntegrationConstruct(this, 'ApigatewayLambdaCustomIntegrationConstruct');

//         const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
//             functionName: 'sample-lambda-custom-integration',
//             runtime: lambda.Runtime.NODEJS_18_X,
//             code: lambda.Code.fromAsset('lambda'),
//             handler: 'index.handler'
//         });
//
//         const api = new apigateway.LambdaRestApi(this, `ApiGatewayAPI`, {
//             restApiName: 'sample-lambda-custom-integration',
//             description: 'sample-lambda-custom-integration',
//             handler: lambdaFunction,
//             proxy: false,
//             endpointConfiguration: {
//                 types: [apigateway.EndpointType.REGIONAL]
//             }
//         });
//
//         const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
//             proxy: false, passthroughBehavior: apigateway.PassthroughBehavior.WHEN_NO_TEMPLATES, requestTemplates: { // integration request
//                 "application/json": `
// #set($ips = $input.params().header.get('X-Forwarded-For'))
// #set($ipArray = $ips.split('\\,'))
// #set($clientIp = $ipArray[0])
// ##set($ix = $ipArray.size() - 1)
// ##set($clientIp = $ipArray[$ix])
//
// {
// "body" : $input.body,
// "headers": {
//         "X-Forwarded-For": "$clientIp",
//         "X-Forwarded-For-Original":"$ips"
//     }
// }
// `
//             }, integrationResponses: [{
//                 statusCode: '200', responseTemplates: {'application/json': '$input.json(\'$.body\')'},
//             },]
//         });
//
//         const methodOptions = {
//             methodResponses: [{
//                 statusCode: "200", responseModels: {
//                     'application/json': apigateway.Model.EMPTY_MODEL,
//                 },
//             },]
//         }
//         api.root.addMethod('ANY', lambdaIntegration, methodOptions);

    }
}

exports.SampleStack = SampleStack;
