import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../database/prisma.service';
import { CreateTeamMemberResponse } from '../../dtos/CreateTeamMemberResponse';
import { TeamMembersRepository } from '../TeamMembersRepository';

@Injectable()
export class PrismaTeamMembersRepository implements TeamMembersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: {
    name: string;
    function: string;
  }): Promise<CreateTeamMemberResponse> {
    const teamMember = await this.prismaService.teamMember.create({
      data: {
        id: randomUUID(),
        name: data.name,
        function: data.function,
      },
    });

    return {
      id: teamMember.id,
      name: teamMember.name,
      function: teamMember.function,
    };
  }
}
