import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTeamMemberBody {
  @IsString()
  @IsNotEmpty({ message: 'The name field is required.' })
  @MinLength(3, { message: 'The name must be at least 3 characters long.' })
  @ApiProperty({ description: 'The name of the team member', minLength: 3 })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'The function field is required.' })
  @ApiProperty({ description: 'The function of the team member' })
  function: string;
}
