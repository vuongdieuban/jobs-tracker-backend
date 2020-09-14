import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class ApplicationUpdatedResponseDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly id: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly position: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly statusId: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly jobPostId: string;
}
