import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(
    /**
     * Dependency injection
     * (Nest will resolve the catsService by creating and returning an instance of CatsService)
     */
    private boardsService: BoardsService,
  ) {}
}
