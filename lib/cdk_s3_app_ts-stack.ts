#!/usr/bin/env node
import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import { BlockPublicAccess, BucketAccessControl } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, 'sample-s3-bucket', {
      // bucketName: 'my-bucket',
      bucketName:'sample-bucket-cdk',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: true,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.KMS_MANAGED,
      accessControl: BucketAccessControl.PRIVATE,
    

      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
          ],
          allowedOrigins: ['http://localhost:3000'],
          allowedHeaders: ['*'],
        },
      ],
      lifecycleRules: [
        {
          abortIncompleteMultipartUploadAfter: cdk.Duration.days(90),
          expiration: cdk.Duration.days(365),
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(30),
            },
          ],
        },
      ],
    });


    
    // // bucket policy
    // const bucketPolicy = new s3.BucketPolicy(this, 'bucket-policy-id-2', {
    //   bucket: s3Bucket,
    // });

    //  add policy statements ot the bucket policy
    // bucketPolicy.document.addStatements(
    //   new iam.PolicyStatement({
    //     effect: iam.Effect.ALLOW,
    //     principals: [new iam.ServicePrincipal('lambda.amazonaws.com')],
    //     actions: ['s3:GetObject'],
    //     resources: [`${s3Bucket.bucketArn}/*`],
    //   }),
    // );

    s3Bucket.grantRead(new iam.AccountRootPrincipal());
  }
}

