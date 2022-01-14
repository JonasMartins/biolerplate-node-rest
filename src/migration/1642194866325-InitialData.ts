import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 } from "uuid";

export class InitialData1642194866325 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public.user (id, name, email, password)
            VALUES ('${v4()}', 'Admin', 'admin@email.com', 'pb_admin' );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.user;`);
    }
}
