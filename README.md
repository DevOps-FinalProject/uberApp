# UberApp DevOps Project Part-1
## This repository contains source code of three micro-services for Uber Bus Application
1. React Frontend Micro-service\
    This is micro-service is responsible for UI of Uber Bus application\
    User can sign-up on the Uber Bus, Admins can add the buses to the fleet, they can cancel the buses\
    from fleet.
    Customers can search the buses and book the buses from the Uber Bus application 

2. Node backend micro-service\
    This micro-service is responsible for handling the authentication of user and provides JWT token to\
    User to make the requests on Python backend. This service has business logic of register/login the users

3. Python backend micro-service\
    This micro-service is responsible for handling the business logic of Uber Bus app, This service allows authenticated users to search/book the available buses ,it exposes the APIs to allow admins to add the buses to the fleet as well as cancel the buses,cancel the bookings 

### Components:

    - Frontend:
    -   1. React JS
    -   2. Nginx server
    - Backend:
    -   1. Python
    -   2. Gunicorn Server
    - Database:
    -   1. MongoDB Atlas

### Prerequisite

1. `aws-cli`
2. `terraform`
3. `git`
4. `Docker`
5. `azure-cli`
6. `metric-server`
7. `aws-iam-authenticator`
8. `Apache Benchmark`

## Creating docker images on AWS ECR

### Create three ECR private repositories on AWS ECR using AWS console(One time process)
#### Navigate to AWS console and search for 
1. uber-fe for Frontend micro-service
2. uber-be for Python micro-service
3. uber-benode for Node micro-service

### This github repository contains the buildspec.yml file which will create the docker images on ECR every-time the developer commits the changes in this repository and it will trigger a codebuild which will push the images to ECR

### Create the UberCI-Codebuild role for CI pipeline using https://github.com/vrdhoke/UberCICDRolesPolicies/blob/master/CIPolicies.png 

### For Continues Integration(CI Pipeline,one time setup)

Set up the Code Build Pipeline for Continues Integration by following the below steps:

1. Go to AWS Console, navigate to the CodeBuild dashboard and click Create Build project.
2. Enter  Name: Uber-Codebuild-CI
3. Description: CI for creating docker images in ECR
4. Build badge: Check the flag to enable
5. Use GitHub for the Source provider
6. Select Connect using OAuth , and click Connect to Github and allow access to your GitHub repo for uberapp After authenticating, under Repository , select Repository in my GitHub account. Then, add the GitHub repository `DevOps-FinalProject\uberApp` for this project.
7. Add source webhook events ,when you check Rebuild every time a code change is pushed to this repository ,any time code
8. Add enviornment variables 
- AWS_ACCOUNT_ID with your AWS account ID
- AWS_REGION us-west-2
- dockerhub_password with your dockerhub password
- dockerhub_username with your dockerhub username
9. Environment:
Environment image: use the Managed image
Operating system: Ubuntu
Runtime: Standard
Image: aws/codebuild/standard:4.0
Image version: Always use the latest image for this runtime version
Privileged: check the flag
10. Service role: Existing Role
Role name: UberCI-Codebuild
11. Under Additional configuration: set the Timeout to 10 minutes
Buildspec , Artifacts, and Logs: Under Build specifications , 
select Use a buildspec file
Skip the Artifacts section ,CloudWatch.
12. Now that our Codebuild CI pipeline is ready, if developer commit in this repository, Docker images would get pushed to the AWS ECR




