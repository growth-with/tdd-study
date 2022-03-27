import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  userId: string;

  @Column()
  password: string;
}

export default UserEntity;
