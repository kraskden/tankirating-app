import axios from 'axios'
import { humanizeTrackModuleNames } from '../lib/modules'

export async function getLatestSnapshot(targetId, format = 'FULL') {
	const {data} = await axios.get(`/target/${targetId}/snapshot/latest`, {
		params: {
			format
		}
	})
	humanizeTrackModuleNames(data)
	return data
}