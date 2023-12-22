import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { MyJwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/demo_db',
    ),
    TasksModule,
    MyJwtModule,
    AuthModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule /*implements NestModule*/ {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes('*');
  // }
}
