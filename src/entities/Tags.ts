import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentTag } from './StudentTag';

@Entity('tags', { schema: 'jiaozuoye' })
export class Tags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @OneToMany(() => StudentTag, (studentTag) => studentTag.tag)
  studentTags: StudentTag[];
}
