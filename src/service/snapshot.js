import axios from 'axios'
import { postProcessTrack } from '../lib/tracking'

export async function apiGetLatestSnapshot(targetId, format = 'FULL') {
	const {data} = await axios.get(`/target/${targetId}/snapshot/latest`, {
		params: {
			format
		}
	})
	postProcessTrack(data)
	return data
}