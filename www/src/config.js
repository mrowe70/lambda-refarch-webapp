// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"
 
const config = {
  "aws_user_pools_web_client_id": "64vjve7jcobmkskq6fb236j9kl",     // CognitoClientID
  "api_base_url": "https://irk3p0chi7.execute-api.us-east-1.amazonaws.com/{StageNameParam}",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-1.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
  "redirect_url": "https://master.d19aj7dzgcy0lz.amplifyapp.com"                                      // AmplifyURL
}; 

export default config;
 