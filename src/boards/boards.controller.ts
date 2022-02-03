import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './interfaces/board.interface';

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
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe) // Binding Pipe (handler-level)
  create(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    console.log(id);
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') stauts: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, stauts);
  }
}
