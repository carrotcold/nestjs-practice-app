import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './interfaces/board.interface';

@Controller('boards')
export class BoardsController {
  constructor(
    /**
     * Dependency injection
     * (Nest will resolve the catsService by creating and returning an instance of CatsService)
     */
    private boardsService: BoardsService,
  ) {}

  @Get()
  getAll(): Board[] {
    return this.boardsService.getAll();
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boardsService.create(title, description);
  }
}
