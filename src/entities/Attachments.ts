import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tasks } from './Tasks';

@Index('task_id', ['taskId'], {})
@Entity('attachments', { schema: 'jiaozuoye' })
export class Attachments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'size' })
  size: number;

  @Column('varchar', { name: 'url', length: 255 })
  url: string;

  @Column('int', { name: 'task_id' })
  taskId: number;

  @ManyToOne(() => Tasks, (tasks) => tasks.attachments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'task_id', referencedColumnName: 'id' }])
  task: Tasks;
}
