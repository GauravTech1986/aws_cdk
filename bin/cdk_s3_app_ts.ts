#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import {CdkStarterStack} from '../lib/cdk_s3_app_ts-stack';

const app = new cdk.App();
new CdkStarterStack(app, 'cdk-stack', {
  stackName: 'cdk-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});