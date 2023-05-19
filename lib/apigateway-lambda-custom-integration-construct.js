const {Construct} = require("constructs");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const fs = require('fs');

const INTEGRATION_REQUEST_FILE = './lib/integration-request.vtl';

class ApigatewayLambdaCustomIntegrationConstruct extends Construct {

    constructor(scope, id, props) {
        super(scope, id, props);

        const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
            functionName: 'sample-lambda-custom-integration',
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'index.handler'
        });

        const api = new apigateway.LambdaRestApi(this, `ApiGatewayAPI`, {
            restApiName: 'sample-lambda-custom-integration',
            description: 'sample-lambda-custom-integration',
            handler: lambdaFunction,
            proxy: false,
            endpointConfiguration: {
                types: [apigateway.EndpointType.REGIONAL]
            }
        });

        const integrationRequestVtl = fs.readFileSync(INTEGRATION_REQUEST_FILE).toString();
        const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
            proxy: false,
            passthroughBehavior: apigateway.PassthroughBehavior.WHEN_NO_TEMPLATES,
            requestTemplates: { // integration request
                'application/json': integrationRequestVtl
            }, integrationResponses: [{
                statusCode: '200', responseTemplates: {'application/json': '$input.json(\'$.body\')'},
            },]
        });

        const methodOptions = {
            methodResponses: [{
                statusCode: "200", responseModels: {
                    'application/json': apigateway.Model.EMPTY_MODEL,
                },
            },]
        }
        api.root.addMethod('ANY', lambdaIntegration, methodOptions);
    }
}

exports.ApigatewayLambdaCustomIntegrationConstruct = ApigatewayLambdaCustomIntegrationConstruct;