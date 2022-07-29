import {Model, Table, Column, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import { User } from '../users/users.model';

interface PostCreatedAttr {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({tableName: 'posts'})
export class Post extends Model <Post, PostCreatedAttr> {
  @ApiProperty({example:'1', description:'unique identif'})
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey:true
    })
    id: number;

  @ApiProperty({example:'admin', description:'user role'})
    @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false
    })
    title: string;

  @ApiProperty({example:'can all', description:'role tips'})
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    content: string;

  @ApiProperty({example:'can all', description:'role tips'})
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    image: string;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;

  @BelongsTo(()=> User)
  author: User;
}
