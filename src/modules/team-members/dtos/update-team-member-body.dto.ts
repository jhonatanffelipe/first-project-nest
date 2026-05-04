import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTeamMemberBody {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long.' })
  @ApiPropertyOptional({ description: 'The name of the team member', minLength: 3 })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The function of the team member' })
  function?: string;
}
