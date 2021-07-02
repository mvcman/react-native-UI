import { Auth } from 'aws-amplify';

async function SignUp(username, password) {
  console.log('Sign up', username, password);
  try {
    const user = await Auth.signUp({
      username,
      password,
    });
    console.log('Sign up user ', user);
    return user;
  } catch (err) {
    console.log({ error: err });
    return { Error: err };
  }
}
async function ConfirmSignUp(username, code) {
  try {
    const user = await Auth.confirmSignUp(username, code);
    console.log('aws confirm signup ', user);
  } catch (err) {
    console.log('error confirming sign up', err);
    return { Error: err };
  }
}

async function SignIn(username, password) {
  console.log(username, password);
  try {
    const user = await Auth.signIn(username, password);
    console.log(user.attributes.sub);
    return user;
  } catch (err) {
    console.log('error signing in', err);
    return { Error: err };
  }
}

async function ResendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
}

async function SignOut() {
  try {
    await Auth.signOut();
  } catch (err) {
    console.log('error signing out: ', err);
    return { Error: err };
  }
}

export { SignUp, ConfirmSignUp, SignIn, ResendConfirmationCode, SignOut };
