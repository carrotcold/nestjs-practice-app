import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../enum/board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptionList: string[] = [
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE,
  ];

  transform(value: any) {
    const upperCaseValue = value.toUpperCase();

    if (!this.isStatusValid(upperCaseValue)) {
      throw new BadRequestException(`${value} is invalid status.`);
    }

    return value;
  }

  private isStatusValid(status: string) {
    return this.StatusOptionList.includes(status);
  }
}
