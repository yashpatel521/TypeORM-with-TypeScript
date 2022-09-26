import { FilteredUser, ID, roleType } from "../types/types";
import { getRepository, In, SelectQueryBuilder } from "typeorm";
import { User } from "../entity/user.entity";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import { BadRequest, NotfoundError } from "../Errors/errors";
import { Role } from "../entity/role.entity";

class RoleService {
  async create(role: Role) {
    const result = await Role.save(role);
    return result;
  }

  async getRoleByType(type: string) {
    const role = await Role.findOne({ where: { type } });
    if (!role) throw new BadRequest("Role not found", 400);
    console.log(role);
    return role;
  }
}

export default new RoleService();
