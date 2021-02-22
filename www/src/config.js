// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "4b42npg43prrh49jd13dn7rumm",     // CognitoClientID
  "api_base_url": "http://127.0.0.1:8080",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
  "redirect_url": "https://localhost:8080"                                      // AmplifyURL
};

export default config;
