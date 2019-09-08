# Overview

Setup your project to have auto incrementing short ticket numbers on Pivotal Tracker.
![example](https://d2y84jyh761mlc.cloudfront.net/items/3N303R3B323K3O3z2L2m/Screen%20Recording%202019-09-08%20at%2010.36%20pm.gif?X-CloudApp-Visitor-Id=3456418&v=c9d0349a)

# Setup
Requires a postgres database. You can run the `lib/createdb.sql` to set it up with the required table. Alternatively you can mod the code to remove the dependency and use a different strategy to generate the ticket numbers.

```
yarn install
```
```
npm install
```

**Grab your pivotal token here.**
![step 1](https://d2y84jyh761mlc.cloudfront.net/items/2R2h0q2c2d3f3F1R3f3Z/Image%202019-09-08%20at%206.22.38%20pm.png?X-CloudApp-Visitor-Id=3456418&v=2e3d3566)
![step 2](https://d2y84jyh761mlc.cloudfront.net/items/0D0K1R470G0E091k0C2n/Image%202019-09-08%20at%206.23.50%20pm.png?X-CloudApp-Visitor-Id=3456418&v=dfec9865)

**Grab your project id here.**
![step1](https://d2y84jyh761mlc.cloudfront.net/items/273T0Z2d3v1233362S2V/Screen%20Recording%202019-09-08%20at%2006.26%20pm.gif?X-CloudApp-Visitor-Id=3456418&v=39344791)

You can use either your own account or it's recommend to setup a "bot" user. Either way **find your service account id here**.
![step 1](https://d2y84jyh761mlc.cloudfront.net/items/2N1L1T22040x3e302V0i/Image%202019-09-08%20at%206.32.11%20pm.png?X-CloudApp-Visitor-Id=3456418&v=2ac282d0)

Then bring up dev tools to find the account id.
![step 2](https://d2y84jyh761mlc.cloudfront.net/items/3u3U1I1v0y0X1R1T1m0t/Image%202019-09-08%20at%206.43.10%20pm.png?X-CloudApp-Visitor-Id=3456418&v=883c5b4a)
  
You'll need [an AWS account](https://aws.amazon.com), after which you can then run the following to deploy via [serverless](https://serverless.com/). Be sure to replace the env variables with the data you retrieved above.

```bash
PIVOTAL_TOKEN=xxxx \
PROJECT_ID=xxxx \
SERVICE_ACCOUNT_ID=xxxx \
TICKET_PREFIX=PAD- \
PGHOST=xxxx \
PGPASSWORD=xxxx \
PGUSER=xxxx \
PGDATABASE=xxxx \
npx serverless deploy
```

# Develop
To run locally, same steps as above but run
```bash
PIVOTAL_TOKEN=xxxx \
PROJECT_ID=xxxx \
SERVICE_ACCOUNT_ID=xxxx \
TICKET_PREFIX=PAD- \
PGHOST=xxxx \
PGPASSWORD=xxxx \
PGUSER=xxxx \
PGDATABASE=xxxx \
npx serverless offline start
```