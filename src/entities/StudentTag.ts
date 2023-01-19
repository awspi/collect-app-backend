import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './Tags';
import { Students } from './Students';
import { Classes } from './Classes';

@Index('class_id', ['classId'], {})
@Index('student_id', ['studentId'], {})
@Index('tag_id', ['tagId'], {})
@Entity('student_tag', { schema: 'jiaozuoye' })
export class StudentTag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'student_id' })
  studentId: number;

  @Column('int', { name: 'tag_id' })
  tagId: number;

  @Column('int', { name: 'class_id' })
  classId: number;

  @ManyToOne(() => Tags, (tags) => tags.studentTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tags;

  @ManyToOne(() => Students, (students) => students.studentTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Students;

  @ManyToOne(() => Classes, (classes) => classes.studentTags, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'class_id', referencedColumnName: 'id' }])
  class: Classes;
}
