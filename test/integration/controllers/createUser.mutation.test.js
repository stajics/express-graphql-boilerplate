const gql = require('graphql-tag');
require('../../index');

const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      token
      email
    }
  }
`;

describe('Mutation :createUser', () => {
  jestTest('Should create new user', async (done) => {
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: 'a@a.a',
        password: 'test',
        firstName: 'first',
        lastName: 'last',
      },
    });

    expect(typeof res.data.createUser.id).toBe('string');
    expect(typeof res.data.createUser.email).toBe('string');
    expect(typeof res.data.createUser.token).toBe('string');
    done();
  });

  jestTest('Should error (missing password)', async (done) => {
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: 'a@a.a',
        password: null,
        firstName: 'first',
        lastName: 'last',
      },
    });

    expect(res.errors.length).toBe(1);
    done();
  });
});
