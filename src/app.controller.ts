import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("excel")
  async geneartePDF(@Res() res) {
    const buffer = await this.appService.generateExcel()
    res.set({
      'Content-Type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition':'attachment; filename-example.xlsx',
      'Content-Length':buffer.length,
    })
    res.end(buffer)
  }

}
