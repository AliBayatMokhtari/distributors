import { axios } from "../boot/axios";

const url = "/schedule";

export default {
	async getSchedules(page, take) {
		const res = await axios.get(`${url}?page=${page}&take=${take}`);
		const { success, error } = res.data;
		return success && !error ? res.data.result.items : null;
	},
	async addSchedule(data) {
		const res = await axios.post(url, data);
		const { success, error } = res.data;
		return success && !error;
	},
	async editSchedule(data) {
		const res = await axios.put(url, data);
		const { success, error } = res.data;
		return success && !error;
	},
	async deleteSchedule(id) {
		const res = await axios.post(`${url}/${id}`);
		const { success, error } = res.data;
		return success && !error;
	},
};
