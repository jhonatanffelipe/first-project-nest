import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DefaultFiltersDto } from '../../../../common/dtos/default-filters.dto';
import { PaginationResponseDto } from '../../../../common/dtos/pagination-response.dto';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';
import { PrismaService } from '../../../../database/prisma.service';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { TeamMembersRepository } from '../team-members.repository';

@Injectable()
export class PrismaTeamMembersRepository implements TeamMembersRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: {
    name: string;
    function: string;
  }): Promise<TeamMemberResponse> {
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

  public async findById(id: string): Promise<TeamMemberResponse | null> {
    const teamMember = await this.prismaService.teamMember.findUnique({
      where: { id },
    });

    if (!teamMember) {
      return null;
    }

    return {
      id: teamMember.id,
      name: teamMember.name,
      function: teamMember.function,
    };
  }

  public async findByName(name: string): Promise<TeamMemberResponse | null> {
    const teamMember = await this.prismaService.teamMember.findFirst({
      where: { name },
    });

    if (!teamMember) {
      return null;
    }

    return {
      id: teamMember.id,
      name: teamMember.name,
      function: teamMember.function,
    };
  }

  public async update(
    id: string,
    data: { name?: string; function?: string },
  ): Promise<TeamMemberResponse> {
    const teamMember = await this.prismaService.teamMember.update({
      where: { id },
      data,
    });

    return {
      id: teamMember.id,
      name: teamMember.name,
      function: teamMember.function,
    };
  }

  public async delete(id: string): Promise<TeamMemberResponse> {
    const teamMember = await this.prismaService.teamMember.delete({
      where: { id },
    });

    return {
      id: teamMember.id,
      name: teamMember.name,
      function: teamMember.function,
    };
  }

  public async findAll(
    pagination: PaginationDto,
    filter: DefaultFiltersDto,
  ): Promise<PaginationResponseDto<TeamMemberResponse>> {
    const { page, limit, sortBy, sortOrder } = pagination;
    const { filterField, filterValue } = filter;
    const skip = (Number(page) - 1) * Number(limit);

    const validFilterFields = ['name', 'function'];
    const validSortFields = ['name', 'function', 'id'];

    const whereCondition =
      filterValue && validFilterFields.includes(filterField)
        ? {
            [filterField]: {
              contains: filterValue,
            },
          }
        : {};

    const sortCondition = validSortFields.includes(sortBy)
      ? { [sortBy]: sortOrder }
      : {};

    const [teamMembers, total] = await Promise.all([
      this.prismaService.teamMember.findMany({
        skip,
        take: Number(limit),
        where: whereCondition,
        orderBy: sortCondition,
      }),
      this.prismaService.teamMember.count({
        where: whereCondition,
      }),
    ]);

    return {
      data: teamMembers.map((member) => ({
        id: member.id,
        name: member.name,
        function: member.function,
      })),
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }
}
