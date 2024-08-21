import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('TodoItemController (e2e)', () => {
    let app: INestApplication;
    let createdTodoItemId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                MongooseModule.forRoot('mongodb://testproject:testpassowrd@localhost:27017/ryproject?authSource=admin'),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/todo-items - create a new todo item', async () => {
        const response = await request(app.getHttpServer())
            .post('/todo-items')
            .send({
                todoListId: 'idtest',
                title: 'New Todo Item 2',
                description: 'A description test 2',
                priority: 3,
            })
            .expect(201);

        expect(response.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            todoListId: 'idtest',
            title: 'New Todo Item 3',
            description: 'A description test 3',
            priority: 3,
        }));

        createdTodoItemId = response.body._id;
    });

    afterAll(async () => {
        await app.close();
    });
});