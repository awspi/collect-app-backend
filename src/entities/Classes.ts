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
import { StudentClassses } from './StudentClassses';
import { StudentTag } from './StudentTag';

@Index('school_id', ['schoolId'], {})
@Entity('classes', { schema: 'jiaozuoye' })
export class Classes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'school_id' })
  schoolId: number;

  @OneToMany(() => ClassCollects, (classCollects) => classCollects.class)
  classCollects: ClassCollects[];

  @ManyToOne(() => Schools, (schools) => schools.classes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: Schools;

  @OneToMany(() => StudentClassses, (studentClassses) => studentClassses.class)
  studentClassses: StudentClassses[];

  @OneToMany(() => StudentTag, (studentTag) => studentTag.class)
  studentTags: StudentTag[];
}
