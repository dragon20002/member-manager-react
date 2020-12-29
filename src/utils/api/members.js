import Client from './client';

export default {
  listMembers() {
    return Client().get('/api/members');
  },
};
