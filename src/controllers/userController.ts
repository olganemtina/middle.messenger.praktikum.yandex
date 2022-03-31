import { getCurrentUser } from '../services/users';

export default class UserContoler {
  getCurrentUser() {
    let user = getCurrentUser();
    return user;
  }
}
