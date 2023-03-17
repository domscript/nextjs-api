import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const root =
  'mongodb+srv://Dominic-projects:oSL62YldzUyQkRP7@cluster0.b52ql.mongodb.net/nestjs-demo?retryWrites=true&w=majority';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(root)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
