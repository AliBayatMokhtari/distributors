import { axios } from "../boot/axios";

const url = "/distributor";

export default {
	async getDistributors(page, take) {
		const res = await axios.get(`${url}?page=${page}&take=${take}`);
		const { success, error } = res.data;
		return success && !error ? res.data.result : null;
	},
	async addDistributor(data) {
		const res = await axios.post(url, data);
		const { success, error } = res.data;
		return success && !error;
	},
	async editDistributor(data) {
		const res = await axios.put(url, data);
		const { success, error } = res.data;
		return success && !error;
	},
	async deleteDistributor(id) {
		const res = await axios.put(`${url}/${id}`);
		const { success, error } = res.data;
		return success && !error;
	},
};
