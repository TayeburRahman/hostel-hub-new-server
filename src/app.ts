import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import { Server } from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { notFound } from './middleware/error.js';
import authRoute from './resources/auth/auth.router.js';
import hostelRoute from './resources/hostel/hostel.router.js';
import hostelAddRouter from './resources/hostelAdd/hostelAdd.router.js';
import hostelBookingRouter from './resources/hostelBooking/hostelBooking.router.js';
import hostelMemberRouter from './resources/hostelMember/hostelMember.router.js';
import mealRouter from './resources/meal/meal.routes.js';
import meal2router from './resources/meal2/meal2.router.js';
import productRoute from './resources/product/product.router.js';
import storeRoute from './resources/store/store.router.js';
import { globalErrorHandler } from './utility/globalErrorHandler.js';

class App {
    public express: Application;

    constructor(public port: number, private uri: string) {
        this.uri = uri;
        this.port = port;
        this.express = express();
        this.initializeDataBaseConnection();
        this.initializeMiddleWare();
        this.initializeControllers();
    }

    private initializeMiddleWare(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(
            fileUpload({
                useTempFiles: true,
            })
        );
    }

    private async initializeDataBaseConnection(): Promise<void> {
        try {
            await mongoose.connect(this.uri);
            console.log('database connected successfully');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    private initializeControllers() {
        this.express.use('/api/v1/product', productRoute);
        this.express.use('/api/v1/auth', authRoute);
        this.express.use('/api/v1/hostel', hostelRoute);
        this.express.use('/api/v1/store', storeRoute);
        this.express.use('/api/v1/hostelAdd', hostelAddRouter);
        this.express.use('/api/v1/hostelBooking', hostelBookingRouter);
        this.express.use('/api/v1/hostelMember', hostelMemberRouter);
        this.express.use('/api/v1/meal', mealRouter);
        this.express.use('/api/v1/meal2', meal2router);
        this.express.all('*', notFound);
        this.express.use(globalErrorHandler);
    }

    public listen(): Server {
        return this.express.listen(this.port, () =>
            console.log(
                `Server started at ${new Date().toLocaleString()} on http://localhost:${
                    this.port
                }/`
            )
        );
    }
}

export default App;
