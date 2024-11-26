import router from "../router";

export function setEmailWithExpiry(email: string, expiryTime: number) {
  const currentTime = new Date().getTime();
  const data = {
    email: email,
    expiresAt: currentTime + expiryTime, // 현재 시간 + 만료 시간(ms)
  };
  localStorage.setItem("is_logged_in", JSON.stringify(data));
}

export function getEmailWithExpiry(key: string) {
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
  return item.email;
}

export function checkIsLoggedIn() {
  const rememberMe = localStorage.getItem("remember_me");
  const email = getEmailWithExpiry("is_logged_in");
  if (
    (rememberMe === "true" && email === null) ||
    (rememberMe !== "true" && email === null)
  ) {
    localStorage.removeItem("remember_me");
    return false;
  } else {
    return true;
  }
}
