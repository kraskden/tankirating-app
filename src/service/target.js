import axios from "axios";
import { CAPTCHA_HEADER } from "../util/api";

export async function apiGetTargetByName(name, type) {
  const {data} = await axios.get(`/target/${name}`, {
    params: {
      targetType: type
    }
  })
  return data
}

export async function apiActivateTarget(id, captcha) {
  const {data} = await axios.post(`/account/${id}/activate`, {}, {
    headers: {
      [CAPTCHA_HEADER]: captcha
    }
  })
  return data
}

export async function apiAddUsers(nicknames, captcha) {
  const {data} = await axios.post('/account', {
    nicknames
  }, {
    headers: {
      [CAPTCHA_HEADER]: captcha
    }
  })
  
  return data 
}