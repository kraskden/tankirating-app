import axios from "axios";
import { CAPTCHA_HEADER, buildAuthHeaders } from "../util/api";

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
    headers: buildAuthHeaders(captcha)
  })
  return data
}

export async function apiUpdateTarget(id, captcha) {
  const {data} = await axios.post(`/account/${id}/update`, {}, {
    headers: buildAuthHeaders(captcha)
  })
  return data
}

export async function apiAddUsers(nicknames, captcha) {
  const {data} = await axios.post('/account', {
    nicknames
  }, {
    headers: buildAuthHeaders(captcha)
  })
  
  return data 
}