import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './interfaces/board.interface';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAll(): Board[] {
    return this.boards;
  }

  create(title: string, description: string): Board {
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
