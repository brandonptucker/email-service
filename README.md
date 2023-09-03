# email-service

A simple email service used to send emails for the [albanyrvresort.com](https://albanyrvresort.com) website.

## Technologies

- [Serverless Framework](https://www.serverless.com/)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/)
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
- [Amazon SES](https://aws.amazon.com/ses/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/)

## Requirements

- [git](https://git-scm.com/downloads)
- [Node.js 18.x](https://nodejs.org/en/download/current)
- [AWS CLI](https://aws.amazon.com/cli/)

## Installation

1. Clone the repo
    ```bash
    git clone https://github.com/brandonptucker/email-service
    ```
2. Change into directory
    ```bash
    cd email-service
    ```
3. Install dependencies
    ```bash
    npm install
    ```
4. Start local service on http://localhost:3001/email
    ```bash
    npm run dev
    ```

## Deployment

> **_NOTE:_** You must install and configure AWS CLI before running the `deploy` or `remove` npm scripts.

Deploy the service to AWS
```bash
npm run deploy
```

Remove the service from AWS
```bash
npm run remove
```