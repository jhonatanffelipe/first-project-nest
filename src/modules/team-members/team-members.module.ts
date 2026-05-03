import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PrismaTeamMembersRepository } from './repositories/prisma/prisma-team-members.repository';
import { TeamMembersRepository } from './repositories/team-members.repository';
import { TeamMembersController } from './team-members.controller';
import { TeamMembersService } from './team-members.service';

@Module({
  controllers: [TeamMembersController],
  providers: [
    PrismaService,
    TeamMembersService,
    {
      provide: TeamMembersRepository,
      useClass: PrismaTeamMembersRepository,
    },
  ],
})
export class TeamMembersModule {}
