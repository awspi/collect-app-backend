import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Collects } from './Collects';
import { StudentClassses } from './StudentClassses';
import { StudentTag } from './StudentTag';
import { Schools } from './Schools';
import { Tasks } from './Tasks';

@Index('school_id', ['schoolId'], {})
@Entity('students', { schema: 'jiaozuoye' })
export class Students {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'xh', length: 255 })
  xh: string;

  @Column('int', { name: 'school_id' })
  schoolId: number;

  @Column('varchar', { name: 'QQ', nullable: true, length: 255 })
  qq: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @OneToMany(() => Collects, (collects) => collects.publisher)
  collects: Collects[];

  @OneToMany(
    () => StudentClassses,
    (studentClassses) => studentClassses.student,
  )
  studentClassses: StudentClassses[];

  @OneToMany(() => StudentTag, (studentTag) => studentTag.student)
  studentTags: StudentTag[];

  @ManyToOne(() => Schools, (schools) => schools.students, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: Schools;

  @OneToMany(() => Tasks, (tasks) => tasks.user)
  tasks: Tasks[];
}
