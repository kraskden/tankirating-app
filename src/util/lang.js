// TODO: Language support is sucks

export function getUserLanguage() {
  const lang = navigator.language || navigator.userLanguage
  if (lang && (lang.indexOf('ru') != -1 || lang.indexOf('ua') != -1)) {
    return 'ru'
  } else {
    return 'en'
  }
}