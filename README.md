# UberApp DevOps Project
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

## Creating docker images on AWS ECR

### This repository contains the buildspec.yml file which will create the docker images on ECR every-time the developer commits the changes in this repository and it will trigger a codebuild which will push the images to ECR