// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "51o6n7o9nmee568ifneefcnchj",     // CognitoClientID
  "api_base_url": "https://fjnctl7y2a.execute-api.us-east-1.amazonaws.com/prod",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d1lzo4rn01gw9f.amplifyapp.com"                                      // AmplifyURL
};

export default config;
