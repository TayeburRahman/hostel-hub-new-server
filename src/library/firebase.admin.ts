import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';

const data = {
    type: 'service_account',
    project_id: 'hostel-hub-7d3bf',
    private_key_id: '8a0f48b32903a8f5f9d52ed98c4b428f96360746',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKmiLbQdRaqK8u\nmnSFJraHuSG5smbtTTSwVoTeBjIxZSJohKPH6vZlg5J6Csdfl54f6SsHLS3h+rXd\nCExpbwSsa4YnweOgTUN3EsoaCMzSQvZ6SZ3lytSmOAWl0x3ly2rcXrqg/M/JoboV\n/Xy5WM+IgCx2RFvs4pC9pSoV9vVZH0ETJq06fN6zEoW04xEDYYwQJ5gxj2sqqTYa\noqJ4qUAh1At9FlrVwmsHJXEm+r81DhWk2lMMLEzCmdg9RAb5rQjC7td1ZMPDk9YN\nAfQID8rs2vJO9Swgh+o4OMU2XjQ51hIyFOFzXtEnEM33gQJj0SKuZcN43ypAb+ME\n9qLBeziVAgMBAAECggEAEL0MTS4So8zU8FY9czTAFtWCRkvJeiiLRlhXkNpVMkSH\nQ7hVqbItWjS1GNUkJK8rlrpWXjjq1gU3GkRRv9I2wiH+CvHXYwqPHNrWDLGWbnau\n02qam34W9IajXNBk43PbZ8qBw8QvTJrKe3+eWtfOCZqBUeIS8C7Fw41OPVNScOLg\n2/D7aRol8A6absllJw4S69+YJfnTzWz6gVbuogscL1LiEHxSNXXQuoTDoKtd2AO5\n7fnL/4QelVpx0CK8zenEIKTwQtumaUY/JhrkpPnwlHVtvTmy3D4aPKZvifj4SSaj\nUw24eL6m2PjzgMvmkaDBXl2R4CSQEwVPrAvNRYj1gQKBgQD52zKCCKUrl1ZtEUza\niTX8xdBGnZFyS1kFNQGh6VNKBQKhXjhMhDe9VH68oEhHa3LD3UHZDLVZRO90AXsf\nhsXoi08rJHxrXStw4iOmC9EznTg5UFIlnV/GziXsjqs9KxUX7LoEmD7LxX0bzGl6\nicAL2rXN6ogELbbqmPISozWGwQKBgQDPlXtl15TX2/OUkPdmkFV/pJ9TZSNntZk+\nGMoRCc3mrbq5pwpfReLM4x0u3hJaH+nzET9y3g4yU/B0C4hefm+ZVJRyzxpzKhIK\ng6KsFGCPNRBJJT6G257KIwzbPHdzThDh+7y1WtLg7AwYx2HKfgUgm7XPgkNgDwQ1\nR1RVbWKa1QKBgB6B1x7tc01pQxI6JIoiasccWBvnLVUpQgtSt4pPdO36wqF1YaZm\nFnA1muvpHioqQm8L2vhnhtUJh7tAWwo0aIHGULpR0CdDzwQPeI7Tro2AytakqgMR\nvhoGHbdOjDYBxqePLf9Vn4U97dKxGMfvfdV0tPIZitYHxufKGPSRnP2BAoGAQ4K4\nCR0duT49b7nd3CtgwwyFDJg99YKn/fwN65CmuDkUG0DqLKYL5tqOKSnsCgeLDJQ1\ncGQrdc66yuLdTO4N2W4agWQ9k+rAx06cXx6ZcLmvPDqypSVT9SWFDuARcRyYfQZk\nDw8kuiXKoVxmv3ZQsJQzgvM4eksn8TPrh4T1pqkCgYEAq62syyBfQvkBgfpW/Apz\nFH5fEUd7hoIXeHt5iSv388vxKposMYEAGw/KQWoPQIPiT7BKeNGv0b9AxT3XuW6Z\nwJr+e6hu2HF57hJtj8S6Cs7o8DzM8ecH1TWOv3gX6nrtyBGAxJt+xizUo3mVcc7h\nZuL8DhJ/C9j7ByVCqT+ABLc=\n-----END PRIVATE KEY-----\n',
    client_email:
        'firebase-adminsdk-cjxxj@hostel-hub-7d3bf.iam.gserviceaccount.com',
    client_id: '109302313830087288243',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cjxxj%40hostel-hub-7d3bf.iam.gserviceaccount.com',
};

const stringData = JSON.stringify(data);
const serviceAccount = JSON.parse(stringData);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.headers.authorization?.startsWith('Bearer ')) {
            const token = req.headers.authorization.split(' ')[1];
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedEmail = decodedUser.email;
        }
    } catch (error) {
        console.log(error);
    }

    next();
};
