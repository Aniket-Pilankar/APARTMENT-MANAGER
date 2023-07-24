import { SESSION_KEY, SESSION_SECRET } from "./constant";
import AES from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";

/**
 * Stores encrypted session-data to browser local-storage to make state persistent
 * @param user session data of user
 */
export const setSession = (session) => {
  const sessionStr = JSON.stringify(session);
  console.log("sessionStr:", sessionStr);
  const sessionCipher = AES.encrypt(sessionStr, SESSION_SECRET).toString();
  window.localStorage.setItem(SESSION_KEY, sessionCipher);
};

/**
 * Delete user's session-data from broswer local-storage
 */
export function clearSession() {
  window.localStorage.clear();
}

/**
 * Gets and decrypts the user's session-data from browser local-storage
 */
export const getSession = () => {
  try {
    const sessionCipher = window.localStorage.getItem(SESSION_KEY);

    if (!sessionCipher) return null;

    const bytes = AES.decrypt(sessionCipher, SESSION_SECRET);
    console.log("bytes:", bytes);
    return JSON.parse(bytes.toString(utf8));
  } catch (error) {
    console.log("error:", error);
    return null;
  }
};
