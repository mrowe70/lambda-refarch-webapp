// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "1r3rm127aj2c60splvth5p6ic0",  // CognitoClientID
    "api_base_url": "https://hvib8lxv93.execute-api.us-east-1.amazonaws.com/{StageNameParam}",  // TodoFunctionApi
    "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
    "redirect_url": "https://master.d1o1pedb6hidcl.amplifyapp.com"  // AmplifyURL
  };
  
  export default config;