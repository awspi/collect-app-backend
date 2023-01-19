import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachments } from './Attachments';
import { Collects } from './Collects';
import { Students } from './Students';

@Index('collect_id', ['collectId'], {})
@Index('user_id', ['userId'], {})
@Entity('tasks', { schema: 'jiaozuoye' })
export class Tasks {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'finish_time' })
  finishTime: Date;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'collect_id' })
  collectId: number;

  @Column('text', { name: 'comment', nullable: true })
  comment: string | null;

  @Column('varchar', { name: 'attachment_url', nullable: true, length: 255 })
  attachmentUrl: string | null;

  @OneToMany(() => Attachments, (attachments) => attachments.task)
  attachments: Attachments[];

  @ManyToOne(() => Collects, (collects) => collects.tasks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'collect_id', referencedColumnName: 'id' }])
  collect: Collects;

  @ManyToOne(() => Students, (students) => students.tasks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Students;
}
