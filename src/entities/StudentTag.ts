import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Students } from './Students';
import { Tags } from './Tags';

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

  @ManyToOne(() => Students, (students) => students.studentTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Students;

  @ManyToOne(() => Tags, (tags) => tags.studentTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tags;
}
