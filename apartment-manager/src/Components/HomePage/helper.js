export function getIsUserLoggedIn(session) {
  return Boolean(session?.token);
}
