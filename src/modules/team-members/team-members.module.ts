import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PrismaTeamMembersRepository } from './repositories/prisma/prisma-team-members.repository';
import { TeamMembersRepository } from './repositories/team-members.repository';
import { CreateTeamMemberController } from './use-cases/create-team-member/create-team-member.controller';
import { CreateTeamMemberService } from './use-cases/create-team-member/create-team-member.service';
import { DeleteTeamMemberController } from './use-cases/delete-team-member/delete-team-member.controller';
import { DeleteTeamMemberService } from './use-cases/delete-team-member/delete-team-member.service';
import { FindAllTeamMembersController } from './use-cases/find-all-team-members/find-all-team-members.controller';
import { FindAllTeamMembersService } from './use-cases/find-all-team-members/find-all-team-members.service';
import { FindTeamMemberByIdController } from './use-cases/find-team-member-by-id/find-team-member-by-id.controller';
import { FindTeamMemberByIdService } from './use-cases/find-team-member-by-id/find-team-member-by-id.service';
import { UpdateTeamMemberController } from './use-cases/update-team-member/update-team-member.controller';
import { UpdateTeamMemberService } from './use-cases/update-team-member/update-team-member.service';

@Module({
  controllers: [
    CreateTeamMemberController,
    FindAllTeamMembersController,
    FindTeamMemberByIdController,
    UpdateTeamMemberController,
    DeleteTeamMemberController,
  ],
  providers: [
    PrismaService,
    CreateTeamMemberService,
    FindAllTeamMembersService,
    FindTeamMemberByIdService,
    UpdateTeamMemberService,
    DeleteTeamMemberService,
    {
      provide: TeamMembersRepository,
      useClass: PrismaTeamMembersRepository,
    },
  ],
})
export class TeamMembersModule {}
