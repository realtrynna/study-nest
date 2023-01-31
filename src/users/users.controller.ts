import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UseInterceptors,
    ParseIntPipe,
    DefaultValuePipe,
    UseGuards,
    ConsoleLogger,
    LoggerService,
    Inject,
    UseFilters,
} from "@nestjs/common";
import {
    BadRequestException,
    InternalServerErrorException,
} from "@nestjs/common/exceptions";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiOkResponse,
    ApiQuery,
    ApiParam,
    ApiBadRequestResponse,
} from "@nestjs/swagger";
import uuid from "uuid";
import { HttpExceptionFilter } from "../exceptions/exception.filter";
import { Logger } from "winston";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { UserService } from "./users.service";
import { createUserDto, VerifyEmailDto, LoginDto, Profile } from "./dto";
import { EmailService } from "src/email/email.service";
import { LoggingInterceptor } from "src/common/interceptors/date.interceptor";
import { ValidationPipe } from "../common/validations/validation.pipe";
import { UserMeta } from "src/common/decorators/user.decorator";
import { AuthGuard } from "src/guard/auth.guard";
import { CustomLogger } from "src/log/logger.service";

interface IUser {
    name: string;
    age: number;
}

@Controller("users")
@ApiTags("사용자")
export class UsersController {
    // readonly #logger = new Logger(UsersController.name);

    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService,
        // private readonly logger: CustomLogger,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    ) {}

    @Get("/practice/:id")
    @UseGuards(AuthGuard)
    @UseInterceptors(LoggingInterceptor)
    async practice(
        @Param("id", ValidationPipe) id: number,
        @UserMeta() user: IUser,
    ) {
        // this.#printLogger();
        const finduser = await this.userService.findUserById(id);

        // throw new HttpExceptionFilter();

        // if (id < 1)
        //     throw new BadRequestException(
        //         "파라미터는 1이상이어야합니다.",
        //         "에러에 대한 부가 설명",
        //     );

        return "hello";
    }

    // 회원 정보 조회
    @Get("/:userId")
    @UseInterceptors(LoggingInterceptor)
    async findUserById(
        @Param("userId", new ParseIntPipe({ errorHttpStatusCode: 500 }))
        userId: number,
    ): Promise<any> {
        console.log(typeof userId);
        return "응답했어요!";
    }

    // 회원 가입
    @ApiOperation({
        summary: "회원 가입",
        description: ``,
    })
    @ApiOkResponse({
        // status: 201, 				// Default 200
        type: Profile,
        description: "회원 가입 성공",
    })
    @ApiBadRequestResponse({
        status: 404,
        description: "클라이언트 에러",
    })
    @Post()
    async createUser(@Body() createUserDto: createUserDto) {
        const createUserVerifyToken = "DLLO-44L2-DLLA-WMDC";
        const createUser = await this.userService.createUser(createUserDto);

        return createUser;
    }

    // 이메일 인증
    // @Post("/email-verify")
    // async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<void> {
    //     return this.userService.verifyEmail(verifyEmailDto);
    // }

    // 로그인
    @Post("/login")
    async login(@Body() loginDto: LoginDto): Promise<void> {
        return this.userService.login(loginDto);
    }

    #printLogger() {
        this.logger.error("error", "Test");
    }
}
