import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DefaultFiltersDto } from '../../../../common/dtos/default-filters.dto';
import {
  PaginatedDto,
  PaginationResponseDto,
} from '../../../../common/dtos/pagination-response.dto';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';
import { CreateTeamMemberResponse } from '../../dtos/create-team-member-response.dto';
import { FindAllTeamMembersService } from './find-all-team-members.service';

@ApiTags('team-members')
@Controller('team-members')
export class FindAllTeamMembersController {
  constructor(private findAllTeamMembersService: FindAllTeamMembersService) {}

  @Get()
  @ApiOkResponse({
    type: PaginatedDto(CreateTeamMemberResponse),
    description: 'List of team members retrieved successfully',
  })
  public async findAll(
    @Query() pagination: PaginationDto,
    @Query() filter: DefaultFiltersDto,
  ): Promise<PaginationResponseDto<CreateTeamMemberResponse>> {
    return await this.findAllTeamMembersService.findAll(pagination, filter);
  }
}
