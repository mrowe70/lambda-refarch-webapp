// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "2os9hd5kq609l3r3ssd8cqkg43",  // CognitoClientID
    "api_base_url": "https://bqw7kxq1kh.execute-api.us-east-1.amazonaws.com/{StageNameParam}",  // TodoFunctionApi
    "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
    "redirect_url": "https://master.d1qrx0vt6j6te8.amplifyapp.com"  // AmplifyURL
  };
  
  export default config;