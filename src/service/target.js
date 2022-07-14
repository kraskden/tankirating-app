import axios from "axios";

export async function apiGetTargetByName(name, type) {
  const {data} = await axios.get(`/target/${name}`, {
    params: {
      targetType: type
    }
  })
  return data
}

export async function apiAddUsers(nicknames, captcha) {
  const {data} = await axios.post('/account', {
    nicknames,
    captcha
  })
  return data 
}