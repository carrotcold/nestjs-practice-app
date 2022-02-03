import { Injectable } from '@nestjs/common';
import { Board } from './interfaces/board.interface';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAll(): Board[] {
    return this.boards;
  }
}
