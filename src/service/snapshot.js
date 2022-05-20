import axios from 'axios'

export async function getLatestSnapshot(targetId, format = 'FULL') {
	return axios.get(`/target/${targetId}/snapshot/latest`, {
		params: {
			format
		}
	})
}