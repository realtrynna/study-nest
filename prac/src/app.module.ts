import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import winston from "winston";
import { utilities, WinstonModule } from "nest-winston";
import { HttpModule } from "@nestjs/axios";
import { TerminusModule } from "@nestjs/terminus";

import { UserModule } from "./users/users.module";
import { LoggerModule } from "./log/logger.module";
import EmailConfig from "./config/email.config";
import { ExceptionModule } from "./exceptions/exception.module";
import { validationEnv } from "./config/validation";
import dbConnect from "./config";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { Logger2Middleware } from "./middlewares/logger2.middleware";
import { HttpExceptionFilter } from "./exceptions/exception.filter";
import { HealthCheckController } from "./health/health.controller";

@Module({
    controllers: [HealthCheckController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
    imports: [
        TerminusModule,
        ExceptionModule,
        UserModule,
        HttpModule,
        LoggerModule,
        ConfigModule.forRoot({
            envFilePath: [
                `${__dirname}/config/env/.${process.env.NODE_ENV}.env`,
            ],
            load: [EmailConfig],
            isGlobal: true,
            validationSchema: validationEnv,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (
                configService: ConfigService,
            ): Promise<TypeOrmModuleOptions> => {
                const config = dbConnect(configService);

                return config.production;
            },
            inject: [ConfigService],
        }),
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    level:
                        process.env.NODE_ENV === "production"
                            ? "info"
                            : "silly",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        utilities.format.nestLike("Practice", {
                            prettyPrint: true,
                        }),
                    ),
                }),
            ],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware, Logger2Middleware).forRoutes("/cache");
    }
}
