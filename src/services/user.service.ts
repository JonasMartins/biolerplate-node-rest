import { DeleteResult, getConnection, UpdateResult } from "typeorm";
import { User } from "./../database/entity/User.entity";
import { UserRepository } from "./../repository/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository =
            getConnection().getCustomRepository(UserRepository);
    }

    public index = async (): Promise<User[]> => {
        const users = await this.userRepository.find();
        return users;
    };

    public findByEmail = async (email: string): Promise<Boolean> => {
        const user = await this.userRepository.findOne({ email });
        if (user) {
            return new Promise((resolve, _) => {
                resolve(true);
            });
        }
        return new Promise((resolve, _) => {
            resolve(false);
        });
    };

    public getById = async (id: string): Promise<User | undefined> => {
        const user = await this.userRepository.findOne({ id: id });
        return user;
    };

    public getByEmail = async (email: string): Promise<User | undefined> => {
        const user = await this.userRepository.findOne({ email });
        return user;
    };
    public create = async (User: User): Promise<User> => {
        const newUser = await this.userRepository.save(User);
        return newUser;
    };
    public update = async (User: User, id: string): Promise<UpdateResult> => {
        const updatedUser = await this.userRepository.update(id, User);
        return updatedUser;
    };
    public delete = async (id: string): Promise<DeleteResult> => {
        const deletedUser = await this.userRepository.delete(id);
        return deletedUser;
    };
}
