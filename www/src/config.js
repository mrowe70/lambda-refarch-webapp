// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "4mutb9ld5e2ipov630463c4u6p",  // CognitoClientID
    "api_base_url": "https://8xvojefnzg.execute-api.us-east-1.amazonaws.com/{StageNameParam}",  // TodoFunctionApi
    "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
    "redirect_url": "https://master.d1uwx9eq7i6sj.amplifyapp.com"  // AmplifyURL
  };
  
  export default config;