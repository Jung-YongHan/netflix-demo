import { useRouter } from "vue-router";

export function useBaseRouter() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push({ name: "MainPage" });
  };
  const navigateToSignIn = () => {
    router.push({ name: "SigninPage" });
  };
  const navigateToSignUp = () => {
    router.push({ name: "SignupPage" });
  };
  const navigateToPopular = () => {
    router.push({ name: "PopularPage" });
  };
  const navigateToSearch = () => {
    router.push({ name: "SearchPage" });
  };
  const navigateToWishlist = () => {
    router.push({ name: "WishlistPage" });
  };
  return {
    navigateToMain,
    navigateToSignIn,
    navigateToSignUp,
    navigateToPopular,
    navigateToSearch,
    navigateToWishlist,
  };
}
