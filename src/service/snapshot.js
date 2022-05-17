import axios from 'axios'

export async function getLatestSnapshot(name, format) {
	return axios.get(`/account/${name}/snapshot/latest`, {
		params: {
			format: 'FULL'
		}
	})
}