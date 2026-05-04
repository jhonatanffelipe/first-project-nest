import { Injectable } from '@nestjs/common';
import { DefaultFiltersDto } from '../../../../common/dtos/default-filters.dto';
import { PaginationResponseDto } from '../../../../common/dtos/pagination-response.dto';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';
import { CreateTeamMemberResponse } from '../../dtos/create-team-member-response.dto';
import { TeamMembersRepository } from '../../repositories/team-members.repository';

@Injectable()
export class FindAllTeamMembersService {
  constructor(private teamMembersRepository: TeamMembersRepository) {}

  public async findAll(
    pagination: PaginationDto,
    filter: DefaultFiltersDto,
  ): Promise<PaginationResponseDto<CreateTeamMemberResponse>> {
    return await this.teamMembersRepository.findAll(pagination, filter);
  }
}
