import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Classes } from './Classes';
import { Collects } from './Collects';
import { Students } from './Students';

@Entity('schools', { schema: 'jiaozuoye' })
export class Schools {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(() => Classes, (classes) => classes.school)
  classes: Classes[];

  @OneToMany(() => Collects, (collects) => collects.school)
  collects: Collects[];

  @OneToMany(() => Students, (students) => students.school)
  students: Students[];
}
