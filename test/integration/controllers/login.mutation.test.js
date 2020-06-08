const gql = require('graphql-tag');
require('../../index');

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      email
    }
  }
`;

describe('Mutation :login', () => {
  jestTest('Should create new user', async (done) => {
    const res = await mutate({
      mutation: LOGIN,
      variables: {
        email: fixtures.users[0].email,
        password: fixtures.users[0].password,
      },
    });

    expect(typeof res.data.login.id).toBe('string');
    expect(typeof res.data.login.email).toBe('string');
    expect(typeof res.data.login.token).toBe('string');
    done();
  });

  jestTest('Should error (bad password)', async (done) => {
    const res = await mutate({
      mutation: LOGIN,
      variables: {
        email: fixtures.users[0].email,
        password: 'badPass',
      },
    });

    expect(res.errors.length).toBe(1);
    done();
  });
});
