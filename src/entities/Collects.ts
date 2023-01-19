import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassCollects } from './ClassCollects';
import { Schools } from './Schools';
import { Students } from './Students';
import { Tasks } from './Tasks';

@Index('publisher_id', ['publisherId'], {})
@Index('school_id', ['schoolId'], {})
@Entity('collects', { schema: 'jiaozuoye' })
export class Collects {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('datetime', { name: 'create_time' })
  createTime: Date;

  @Column('datetime', { name: 'end_time' })
  endTime: Date;

  @Column('int', { name: 'publisher_id' })
  publisherId: number;

  @Column('int', { name: 'school_id' })
  schoolId: number;

  @Column('int', { name: 'total_people' })
  totalPeople: number;

  @Column('int', { name: 'finished_people' })
  finishedPeople: number;

  @Column('enum', { name: 'progress', enum: ['0', '1', '2'] })
  progress: '0' | '1' | '2';

  @Column('enum', { name: 'attachment_type', enum: ['file', 'pic'] })
  attachmentType: 'file' | 'pic';

  @OneToMany(() => ClassCollects, (classCollects) => classCollects.collect)
  classCollects: ClassCollects[];

  @ManyToOne(() => Schools, (schools) => schools.collects, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: Schools;

  @ManyToOne(() => Students, (students) => students.collects, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'publisher_id', referencedColumnName: 'id' }])
  publisher: Students;

  @OneToMany(() => Tasks, (tasks) => tasks.collect)
  tasks: Tasks[];
}
