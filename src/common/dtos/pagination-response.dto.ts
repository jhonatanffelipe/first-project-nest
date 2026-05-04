import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export abstract class PaginationResponseDto<T> {
  @ApiProperty({
    description: 'The data of the current page',
    required: true,
    type: [Object],
  })
  data: T[];

  @ApiProperty({
    description: 'The total number of items',
    required: true,
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'The current page number',
    required: true,
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'The number of items per page',
    required: true,
    example: 10,
  })
  limit: number;
}

export function PaginatedDto<T>(classRef: Type<T>) {
  abstract class PaginatedDtoHost extends PaginationResponseDto<T> {
    @ApiProperty({ type: [classRef] })
    declare data: T[];
  }
  return PaginatedDtoHost;
}
