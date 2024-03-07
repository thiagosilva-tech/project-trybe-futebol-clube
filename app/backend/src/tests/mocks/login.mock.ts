const user = {
    id: 1,
    name: 'Thiago Silva',
    email: 'thiagosilva@email.com',
    password: 'ThiagoSilva',
  };
  
  const userWithoutPassword = {
    id: 1,
    name: 'Thiago Silva',
    email: 'thiagosilva@email.com',
  };
  
  const wrongPassUser = {
    id: 1,
    name: 'Thiago Silva',
    email: 'thiagosilva@email.com',
    password: 'xxxxxxxxxx',
  };
  
  const users = [
    userWithoutPassword,
    {
      id: 2,
      name: 'Thiago Silva',
      email: 'thiagosilva@email.com',
    },
  ];
  
  const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
  const invalidPasswordLoginBody = { email: 'thiagosilva@email.com', password: 'Thiago' };
  const invalidEmailLoginBody = { email: 'invalid_email', password: 'ThiagoSilva' };
  const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };
  
  export {
    user,
    userWithoutPassword,
    users,
    invalidEmailLoginBody,
    invalidPasswordLoginBody,
    validLoginBody,
    wrongPassUser,
    userRegistered,
  };
  