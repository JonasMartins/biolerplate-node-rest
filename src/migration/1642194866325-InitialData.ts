import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 } from "uuid";
import argon2 from "argon2";

export class InitialData1642194866325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pass = await argon2.hash("pb_admin");

    await queryRunner.query(`
            INSERT INTO public.user (id, name, email, password)
            VALUES ('${v4()}', 'Admin', 'admin@email.com', '${pass}' );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.user;`);
  }
}
