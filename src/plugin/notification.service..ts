import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class NotificationService {
  private lambda: AWS.Lambda;

  constructor(private configService: ConfigService) {
    const awsCredentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    };

    AWS.config.update(awsCredentials);
    this.lambda = new AWS.Lambda();
  }

  async sendNotification(message: string): Promise<void> {
    const payload = {
      body: JSON.stringify({ message: message }),
    };

    const params = {
      FunctionName: 'SendSNSMessage',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    };

    try {
      const data = await this.lambda.invoke(params).promise();
      const payload = JSON.parse(data.Payload as string);
      console.log('Lambda response:', payload);
    } catch (err) {
      console.error('Error invoking Lambda function:', err);
    }
  }
}
