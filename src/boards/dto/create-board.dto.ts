import { IsNotEmpty } from 'class-validator';

/**
 * DTO는 interface, class 둘다 사용 가능하지만
 * class는 interface와 다르게 런타임에서 작동하기 때문에
 * 파이프와 같은 기능을 이용할 때 더 유용하다
 */

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;
  description: string;
}
