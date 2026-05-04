import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export abstract class DefaultFiltersDto {
  @IsOptional()
  @ApiProperty({
    description: 'The field to filter by',
    required: false,
    example: 'name',
  })
  filterField: string = '';

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The value to filter by',
    required: false,
    example: '',
  })
  filterValue: string = '';
}
