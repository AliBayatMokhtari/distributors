import { axios } from "../boot/axios";

const url = "scheduleResultType";

export default {
	async getScheduleResultTypes() {
		const res = await axios.get(url);
		const { success, error } = res.data;
		return success && !error ? res.data.result : null;
	},
	async addScheduleResultType(data) {
		const res = await axios.post(url, data);
		const { success, error } = res.data;
		return success && !error ? true : false;
	},
	async editScheduleResultType(data) {
		const res = await axios.put(url, data);
		const { success, error } = res.data;
		return success && !error ? true : false;
	},
	async deleteScheduleResultType(id) {
		const res = await axios.delete(`${url}/${id}`);
		const { success, error } = res.data;
		return success && !error ? true : false;
	},
};
