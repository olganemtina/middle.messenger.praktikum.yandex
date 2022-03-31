import UserContoler from '../controllers/userController';
import User from '../models/user';
import Users from '../../data/users.json';

export const getCurrentUser = () => (Users as Array<User>).find((x) => x.id == 1);
