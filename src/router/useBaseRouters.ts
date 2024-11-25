import {useRouter} from "vue-router";

export function useBaseRouter() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push({name : "MainPage"})
  }
  const navigateToSignIn = () => {
    router.push({name : "SigninPage"})
  }
  const navigateToSignUp = () => {
    router.push({name : "SignupPage"})
  }
  return {
    navigateToMain,
    navigateToSignIn,
    navigateToSignUp
  }
}