import { axios } from "../boot/axios";

const url = "scheduleType";

export default {
	async getScheduleTypes() {
		const res = await axios.get(url);
		const { success, error } = res.data;
		return success && !error ? res.data.result : null;
	},
	async addScheduleType(data) {
		const res = await axios.post(url, data);
		const { success, error } = res.data;
		return success && !error ? true : false;
	},
	async editScheduleType(data) {
		const res = await axios.put(url, data);
		const { success, error } = res.data;
		return success && !error ? true : false;
	},
	async deleteScheduleType(id) {
		const res = await axios.delete(`${url}/${id}`);
		const { success, error } = res.data;
		return success && !error ? true : false;
	},
};
