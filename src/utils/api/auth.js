import Client from './client';

export default {
  login({ userId, password }) {
    return Client().post('/api/login', {
      userId,
      password,
    });
  },
  hasAuth() {
    return Client().get('/api/login/has-auth');
  },
};
