// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "s6ad2vk1lujieh32i7arjkda3",  // CognitoClientID
    "api_base_url": "https://2nzqw414va.execute-api.us-east-1.amazonaws.com/{StageNameParam}",  // TodoFunctionApi
    "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
    "redirect_url": "https://master.d25qg1jdb3t1hs.amplifyapp.com"  // AmplifyURL
  };
  
  export default config;