// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "3qj2u5p5em3ndol53fqj0mbvso",  // CognitoClientID
    "api_base_url": "https://8dt1x6cf6h.execute-api.us-east-1.amazonaws.com/{StageNameParam}",  // TodoFunctionApi
    "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
    "redirect_url": "https://master.d2dtmv7wgyraz0.amplifyapp.com"  // AmplifyURL
  };
  
  export default config;