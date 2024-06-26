function getCookie(key) {
  try {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${encodeURIComponent(key)}=`))
      ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : '';
  } catch (error) {
    // eslint-disable-next-line
    throw new Error(`Error processing cookie. ${error instanceof Error ? error.message : ''}`);
  }
}

function saveCookie(key, value = '') {
  try {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; max-age=86400`;
  } catch (error) {
    // eslint-disable-next-line
    throw new Error(`Error processing cookie. ${error instanceof Error ? error.message : ''}`);
  }
}

function dropCookie(key) {
  try {
    document.cookie = `${encodeURIComponent(key)}=; path=/; max-age=0`;
  } catch (error) {
    // eslint-disable-next-line
    throw new Error(`Error processing cookie. ${error instanceof Error ? error.message : ''}`);
  }
}

export { getCookie, saveCookie, dropCookie };
