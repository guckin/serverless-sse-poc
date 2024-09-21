import {RemovalPolicy, Stack} from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import {Construct} from 'constructs';

export class VideoStack extends Stack {

  public readonly s3Bucket: Bucket;

  constructor(scope: Construct, id: string, props: {stage: string}) {
    super(scope, id);
    this.s3Bucket = new Bucket(this, 'VideoStorageBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      bucketName: `video-storage-bucket-${props.stage}`,
    });
  }

}
