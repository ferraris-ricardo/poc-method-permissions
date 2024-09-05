import { Injectable } from '@nestjs/common';
import { RequiresPermissions } from './decorators/requires-permissions';



@Injectable()
export class AppService {

  @RequiresPermissions(['users:read'])
  getAllUsers() {
    return "All Users";
  }

  @RequiresPermissions(['users:write'])
  createUser() {
    return "User Created";
  }
}
