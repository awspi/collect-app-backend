import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Classes } from './Classes';
import { Students } from './Students';

@Index('class_id', ['classId'], {})
@Index('student_id', ['studentId'], {})
@Entity('student_classses', { schema: 'jiaozuoye' })
export class StudentClassses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'student_id' })
  studentId: number;

  @Column('int', { name: 'class_id' })
  classId: number;

  @Column('int', { name: 'permisson', default: () => "'0'" })
  permisson: number;

  @ManyToOne(() => Classes, (classes) => classes.studentClassses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'class_id', referencedColumnName: 'id' }])
  class: Classes;

  @ManyToOne(() => Students, (students) => students.studentClassses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Students;
}
