import axios from "axios";

export async function getTargetByName(name, type) {
  const {data} = await axios.get(`/target/${name}`, {
    params: {
      targetType: type
    }
  })
  return data
}

export async function addUsers(nicknames, captcha) {
  const {data} = await axios.post('/account', {
    nicknames,
    captcha
  })
  return data 
}

// export async function checkExisting()