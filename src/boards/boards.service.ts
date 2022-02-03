import { Injectable } from '@nestjs/common';
import { Board } from './interfaces/board.interface';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
}
