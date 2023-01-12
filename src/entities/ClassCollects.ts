import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Classes } from "./Classes";
import { Collects } from "./Collects";

@Index("collect_id", ["collectId"], {})
@Index("class_id", ["classId"], {})
@Entity("class_collects", { schema: "jiaozuoye" })
export class ClassCollects {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "class_id" })
  classId: number;

  @Column("int", { name: "collect_id" })
  collectId: number;

  @ManyToOne(() => Classes, (classes) => classes.classCollects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "class_id", referencedColumnName: "id" }])
  class: Classes;

  @ManyToOne(() => Collects, (collects) => collects.classCollects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "collect_id", referencedColumnName: "id" }])
  collect: Collects;
}
