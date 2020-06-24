const gql = require('graphql-tag');
require('../../index');

const ME = gql`
  query {
    me {
      _id
      email
      firstName
    }
  }
`;

describe('Query :me', () => {
  jestTest('Should return current user info', async (done) => {
    server.login(fixtures.users[0]);

    const res = await query({
      query: ME
    });

    expect(String(res.data.me._id)).toEqual(fixtures.users[0]._id.toString());
    expect(res.data.me.email).toEqual(fixtures.users[0].email);
    done();
  });
});
