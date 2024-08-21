import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './commons/logger.middleware';
import { UsersModule } from './users/user.module';
import { TodoListsModule } from './todolists/todolist.module';
import { TodoItemsModule } from './todoitems/todoitem.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todo-app', {}),
    UsersModule,
    TodoListsModule,
    TodoItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

