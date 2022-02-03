import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './enum/board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    /**
     * Inject Repository to Service
     */
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  async deleteBoard(id: number) {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cannot find board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardRepository.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
