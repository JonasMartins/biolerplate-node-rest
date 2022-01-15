import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 } from "uuid";
import { loremIpsum } from "lorem-ipsum";

export class PostsBootstrap1642201187875 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const user = await queryRunner.query(`
            SELECT id FROM public.user WHERE name like '%Admin%';
        `);

        if (user[0].id) {
            await queryRunner.query(
                `INSERT INTO post (id, body, "creator_id") VALUES ('${v4()}', '${loremIpsum()}', '${
                    user[0].id
                }');`
            );

            await queryRunner.query(
                `INSERT INTO post (id, body, creator_id) VALUES ('${v4()}', '${loremIpsum()}', '${
                    user[0].id
                }');`
            );

            await queryRunner.query(
                `INSERT INTO post (id, body, "creator_id") VALUES ('${v4()}', '${loremIpsum()}', '${
                    user[0].id
                }');`
            );

            await queryRunner.query(
                `INSERT INTO post (id, body, "creator_id") VALUES ('${v4()}', '${loremIpsum()}', '${
                    user[0].id
                }');`
            );

            await queryRunner.query(
                `INSERT INTO post (id, body, "creator_id") VALUES ('${v4()}', '${loremIpsum()}', '${
                    user[0].id
                }');`
            );

            await queryRunner.query(
                `INSERT INTO post (id, body, creator_id) VALUES ('${v4()}', '${loremIpsum()}', '${
                    user[0].id
                }');`
            );

            await queryRunner.query(
                `INSERT INTO post (id, body, creator_id) VALUES ('${v4()}', '${loremIpsum()}', '${
                    user[0].id
                }');`
            );
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM post;");
    }
}
