import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './interfaces/board.interface';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAll(): Board[] {
    return this.boards;
  }

  create({ title, description }: CreateBoardDto): Board {
    const newBoard: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(newBoard);
    return newBoard;
  }
}
