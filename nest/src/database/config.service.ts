import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { Profile } from "../entities/Profile";
import { Workspace } from "src/entities/Workspace";
import { Channel } from "diagnostics_channel";

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: this.configService.get<string>("DB_HOST"),
            port: this.configService.get<number>("DB_PORT"),
            username: this.configService.get<string>("DB_USERNAME"),
            password: this.configService.get<string>("DB_PASSWORD"),
            database: this.configService.get<string>("DB_DATABASE"),
            entities: [
                User,
                Post,
                Profile,
                Workspace,
                Channel,
            ],
            // migrations: [""],
            synchronize: true,
            logging: true,
            charset: "utf8mb4",
        }
    }
}