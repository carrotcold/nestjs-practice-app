import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './enum/board-status.enum';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard({ title, description }: CreateBoardDto): Promise<Board> {
    const newBoard: Board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(newBoard);
    return newBoard;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);

    if (!found) {
      // throw new NotFoundException(); // { "statusCode": 404, "message": "Not Found" }
      throw new NotFoundException(`Cannot find board with id ${id}`); // custom message
    }

    return found;
  }
}
