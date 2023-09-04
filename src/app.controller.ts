import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("health")
  @ApiOperation({ summary: "Checks API health" })
  @ApiResponse({ status: HttpStatus.OK, description: "It is up and running!" })
  getHealth(): string {
    return this.appService.getHealth();
  }
}
