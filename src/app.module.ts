import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { TeamMembersRepository } from './repositories/TeamMembersRepository';
import { PrismaTeamMembersRepository } from './repositories/prisma/PrismaTeamMembersRepository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: TeamMembersRepository,
      useClass: PrismaTeamMembersRepository,
    },
  ],
})
export class AppModule {}
