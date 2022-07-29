import {Model, Table, Column, DataType, BelongsToMany, HasMany} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Post } from '../posts/posts.model';

interface UserCreatedAttr {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model <User, UserCreatedAttr> {
  @ApiProperty({example:'1', description:'unique identif'})
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey:true
    })
    id: number;

  @ApiProperty({example:'harmash.alex@gmail.com', description:'user email'})
    @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false
    })
    email: string;

  @ApiProperty({example:'Fjds3%$DFo202', description:'user password'})
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    password: string;

  @ApiProperty({example:'true', description:'user ban'})
    @Column({
      type: DataType.BOOLEAN,
      defaultValue: false
    })
    banned: boolean;

  @ApiProperty({example:'spam', description:'ban reason'})
    @Column({
      type: DataType.STRING,
      allowNull: true
    })
    banReason: string;

  @BelongsToMany(()=> Role, ()=>UserRoles)
  roles: Role[];

  @HasMany(()=> Post)
  posts: Post[];
}
