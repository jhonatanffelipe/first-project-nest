import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTeamMemberBody {
  @IsString()
  @IsNotEmpty({ message: 'The name field is required.' })
  @MinLength(3, { message: 'The name must be at least 3 characters long.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'The function field is required.' })
  function: string;
}
