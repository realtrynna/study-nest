import { ApiProperty, ApiHeader } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    IsBoolean,
} from "class-validator";
import { Transform } from "class-transformer";

@ApiHeader({ name: "" })
// eslint-disable-next-line prettier/prettier
export class CreateUserDto {
    @Transform(({ key, value, obj }) => {
        return value;
    })
    email: string;
    // eslint-disable-next-line prettier/prettier

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    name: string;
    // eslint-disable-next-line prettier/prettier

    @IsString()
    @IsNotEmpty()
    password: string;
    // eslint-disable-next-line prettier/prettier

    // @Transform(({ key, value, obj }) => {
    //     return value === "1" ? true : false;
    // })
    @IsNotEmpty()
    gender: string;

    // constructor({ email, name, password, gender }) {
    //     this.email = email;
    //     this.name = name;
    //     this.password = password;
    //     this.gender = gender;
    // }
}
