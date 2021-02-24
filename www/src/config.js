// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "5b2fccf4dvlqj3e74shj737oug",  // CognitoClientID
    "api_base_url": "https://g3w0bdj4qe.execute-api.us-east-1.amazonaws.com/{StageNameParam}",  // TodoFunctionApi
    "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
    "redirect_url": "https://master.d1fejizwkw6rff.amplifyapp.com"  // AmplifyURL
  };
  
  export default config;