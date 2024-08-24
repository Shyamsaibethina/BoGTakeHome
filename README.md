## Introduction

Hello, thank you for showing your interest in Bits of Good! This semester, we are focusing our recruitment on the practical skills of developers through this assessment! We hope you enjoy the task and if you have any questions or if any part is ambiguous, please file a GitHub issue on the repository with whichever task number (i.e. 0,1,2,3, etc.) you are working on!

While this assessment comes in various levels (Setup --> Expert), we do not expect you to be able to complete all of the levels; we just want to see your thought process and how you write and organize code. Additionally, we have provided a sample Express.js boilerplate but feel free to use a different framework or customize this repository to your needs (i.e. install any extra libraries, etc. you need). Our only requirement is that you use Javascript/Typescript with a NoSQL database (i.e. Firestore, MongoDB, etc.).

Because this assessment is very open ended, there are many ways to do the tasks so for most of the tasks, there is no right or wrong way to do things.

To submit your project, please commit your code to Github (preferred) or another version control platform and share a link to your repository in our application.

**_Once again, we would like to emphasize this take home assessment is designed to be challenging and we do not expect you to be able to do the entire thing._**

## Context

For this take home assessment, we are building an animal training management app! Our job for the app, is to build out backend functionality to manage different users, animals, and training logs. Schemas for these data models can be found in `Schemas.md`

## Getting Started

If you would like to use our boilerplate, you can easily get started by:

- Install Node.js (we reccommend v16+ but should work with older versions too)
- Clone the repository: `git clone https://github.com/GTBitsOfGood/spring23-dev-assessment.git`
- Install the Dependencies: `npm install`
- Start the Http server: `npm run start`
- Navigate to `localhost:5000/`

## Level 0: Setup

- (0) Setup a NoSQL database
- (1) Create a GET endpoint at `/api/health` to test whether your API server is functioning and healthy
  - This can return a JSON with `{"healthy": true}`

## Level 1: Easy

- (2) Create a POST endpoint at `/api/user` to create a user in the database based on information passed into the body
- (3) Create a POST endpoint at `/api/animal` to create an animal in the database based on information passed into the body
- (4) Create a POST endpoint at `/api/training` to create a training log in the database based on information passed into the body

- Note these requests will have a similar request body and response statuses:
  - Body: A JSON containing the user/animal/training log information for the user/animal/training log we want to create
  - Response:
    - **Status 200 (Success):** If the body contains all of the information and is able to create the user/animal/training log
    - **Status 400:** If the body contains incorrect information
    - **Status 500:** For any other errors that occur

## Level 2: Medium

- (5) In the training log creation endpoint (3), we want to add in a check to ensure that the animal specified in the training log belongs to the user specified in the training log. Add in code to do this.

  - Response:
    - **Status 400:** If the training log animal is not owned by specified user

- We want to add admin functionality to this backend API to allow the admins to view all the data in the database
  - (6) Create a GET endpoint at `/api/admin/users` which will return all of the users in the database (not with their passwords)
  - (7) Create a GET endpoint at `/api/admin/animals` which will return all of the animals in the database
  - (8) Create a GET endpoint at `/api/admin/training` which will return all of the training logs in the database
  - Response:
    - **Status 200 (Success):** If we are able to retrieve the users/animals/training logs
    - **Status 500**: For any other errors
  - **Note:** These endpoints must implement pagination -- ideally using the document IDs or some other property that has natural ordering (i.e. take a look at approach 2 in this [article](https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr) if you are using MongoDB)

## Level 3: Hard

- (9) We want to add user authentication. In the user creation endpoint (1), add code that allows a password to be accepted. Encrypt this password using an encryption library (we reccommend using [bcrypt](https://www.npmjs.com/package/bcrypt)) and save it in the database under the user's password field
- (10) Create a POST endpoint at `/api/user/login` that accepts an email and password and tests whether the password is valid for the given email.

  - Response:
    - **Status 200 (Success):** If the email/password combo is valid
    - **Status 403**: If the email password combo is invalid

- (11) We are going to make our application even more secure by adding JSON Web Token (JWT) functionality to secure our endpoints. Create a POST endpoint at `/api/user/verify` that issues a JSON Web Token to the user if they issue the correct email/password combination.
  - Response:
    - **Status 200 (Success):** If the email/password combo is valid + issue a JWT that includes the entirety of their profile information
    - **Status 403**: If the email password combo is invalid
- (12) In each of our endpoints, verify the JWT and only allow execution of the endpoint if the JWT is not expired and is valid
- (13) Because the JWT includes information about the user making the request, refactor your endpoints to draw information from the JWT rather than the body of the request
  - I.e. we no longer need to manually specifiy a user id when creating a service animal beacuse we can pull from the info encoded into the JWT.

## Level 4: Expert

- (14) For the final part, we want to add file upload functionality. For this part, you are welcome to use any cloud file storage provider you would like. Create a POST endpoint at `/api/file/upload` to upload your file at.
  - Body: Contains the _type of data_ (i.e. animal image, user image, or training log video) and the ID of the user/animal/training log this file belongs to
  - Response:
    - **Status 200 (Success)**: Successfully uploaded the video to the cloud storage
    - **Status 500**: For any other errors
  - Notes:
    - The method you decide to transport the file (i.e. whether it be multipart, base64, etc.) is left up to you as a design decision
    - Make sure to update the specific document in your database with the correct file reference upon upload completion
