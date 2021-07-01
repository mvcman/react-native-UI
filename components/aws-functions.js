import {Auth} from 'aws-amplify';

async function SignUp(username, password) {
  console.log('Sign up', username, password);
  try {
    const {user} = await Auth.signUp({
      username,
      password,
    });
    console.log(user);
  } catch (err) {
    console.log({error: err});
    return {error: err};
  }
}
async function ConfirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

async function SignIn(username, password) {
  console.log(username, password);
  try {
    const user = await Auth.signIn(username, password);
    console.log(user.attributes.sub);
    return user;
  } catch (error) {
    console.log('error signing in', error);
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
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

export {SignUp, ConfirmSignUp, SignIn, ResendConfirmationCode, SignOut};
