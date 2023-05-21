

export const CAPTCHA_HEADER = "X-Captcha";


export function buildAuthHeaders(captcha) {
  return {
    [CAPTCHA_HEADER]: captcha || undefined,
    'Authorization': localStorage.getItem('auth') || undefined
  }
}