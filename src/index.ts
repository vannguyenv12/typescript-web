import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({ name: 'Van Nguyen', age: 18 });

const root = document.getElementById('root');


if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
}
