import router from "../router";

export function setWithExpiry(key: string, expiryTime: number) {
  const currentTime = new Date().getTime();
  const data = {
    expiresAt: currentTime + expiryTime, // 현재 시간 + 만료 시간(ms)
  };
  localStorage.setItem(key, JSON.stringify(data));
}

export function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    // 로컬스토리지에 해당 key가 없으면 null 반환
    return null;
  }

  const item = JSON.parse(itemStr);
  const currentTime = new Date().getTime();

  if (currentTime > item.expiresAt) {
    // 만료 시간이 현재 시간보다 작으면 null 반환 (만료된 경우)
    localStorage.removeItem(key); // 만료된 데이터 삭제
    return null;
  }

  // 만료되지 않았다면 value 반환
  return item.expiresAt;
}

export function checkIsLoggedIn() {
  const rememberMe = localStorage.getItem("remember_me");
  const isLoggedIn = getWithExpiry("is_logged_in");
  console.log(rememberMe);
  console.log(isLoggedIn);
  if (
    (rememberMe === "true" && isLoggedIn === null) ||
    (rememberMe !== "true" && isLoggedIn === null)
  ) {
    localStorage.removeItem("remember_me");
    router.push({ name: "SigninPage" });
  } else {
    router.push({ name: "MainPage" });
  }
}
