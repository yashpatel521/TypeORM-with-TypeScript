import { FilteredUser, ID, roleType } from "../types/types";
import { getRepository, In, SelectQueryBuilder } from "typeorm";
import { User } from "../entity/user.entity";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import { BadRequest, NotfoundError } from "../Errors/errors";

class UserService {
  async findById(id: number) {
    return await User.findOne({
      where: { id },
    });
  }

  //   async findByIdOrThrow(id: number) {
  //     const user = await User.findOne({
  //       where: { id },
  //     });
  //     if (!user) {
  //       throw new NotfoundError("User not found");
  //     }
  //     return user;
  //   }

  async create(user: User) {
    const result = await User.save(user);
    return result;
  }

  async findByEmail(email: string) {
    const result = await User.findOne({
      where: { email },
    });
    return result;
  }

  //   async findOrCreate(user: User) {
  //     let result = await this.findByPhoneNumber(user.phoneNumber);
  //     if (!result) {
  //       result = await user.save();
  //     }
  //     return result;
  //   }

  //   async findByPhoneNumber(phoneNumber: string) {
  //     const user = await User.findOne({ where: { phoneNumber } });
  //     return user;
  //   }

  //   async findAllFiltered(filter: FilteredUser) {
  //     let user: SelectQueryBuilder<User> | PaginationAwareObject = getRepository(
  //       User
  //     )
  //       .createQueryBuilder("user")
  //       .leftJoinAndSelect("user.role", "role");

  //     if (filter.ids && filter.ids.length) {
  //       user = user.andWhere("id IN :ids", { ids: filter.ids });
  //     }

  //     if (filter.name) {
  //       user = user.andWhere("name LIKE :name", { name: `%${filter.name}%` });
  //     }

  //     if (filter.phoneNumber) {
  //       user = user.andWhere("user.phoneNumber LIKE :number", {
  //         number: `%${filter.phoneNumber}%`,
  //       });
  //     }

  //     if (filter.role) {
  //       user = user.andWhere("role.name = :role", { role: filter.role });
  //     }

  //     user = await user.paginate();

  //     return user;
  //   }
}

export default new UserService();
