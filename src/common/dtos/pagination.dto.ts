import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export abstract class PaginationDto {
  @IsOptional()
  @IsInt({ message: 'The limit must be an integer.' })
  @Min(1, { message: 'The number of items per page must be at least 1.' })
  @Max(100, { message: 'The number of items per page cannot exceed 100.' })
  @Type(() => Number)
  @ApiProperty({
    description: 'The number of items per page',
    required: false,
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  limit: number = 10;

  @IsOptional()
  @IsInt({ message: 'The page number must be an integer.' })
  @Min(1, { message: 'The page number must be at least 1.' })
  @Type(() => Number)
  @ApiProperty({
    description: 'The current page number',
    required: false,
    example: 1,
    minimum: 1,
    default: 1,
  })
  page: number = 1;

  @IsOptional()
  @IsString({ message: 'The sortBy field must be a string.' })
  @ApiProperty({
    description: 'The field to sort by',
    required: false,
    example: 'createdAt',
  })
  sortBy: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: 'The sortOrder must be either "asc" or "desc".',
  })
  @ApiProperty({
    description: 'The sort order',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc',
    default: 'asc',
  })
  sortOrder: 'asc' | 'desc' = 'asc';
}
