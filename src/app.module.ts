import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './commons/logger.middleware';
import { TodoListsController } from './presentation/controllers/todo-list.controller';
import { TodoItemsController } from './presentation/controllers/todo-item.controller';
import { TodoListRepositoryImpl } from './infrastructure/repositories/todo-list.repository.impl';
import { TodoItemRepositoryImpl } from './infrastructure/repositories/todo-item.repository.impl';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { QueryBus } from '@nestjs/cqrs/dist/query-bus';
import { CommandBus } from '@nestjs/cqrs/dist/command-bus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.example"
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    TodoListsController,
    TodoItemsController,
  ],
  providers: [
    TodoListRepositoryImpl,
    TodoItemRepositoryImpl,
    UserRepositoryImpl,
    CommandBus,
    QueryBus,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}