import { axios } from "../boot/axios";

const url = "/donor";

export default {
	async getDonors(page, take) {
		const res = await axios.get(`${url}?page=${page}&take=${take}`);
		const { success, error } = res.data;
		return success && !error ? res.data.result : null;
	},
	async getDonor(id) {
		const res = await axios.get(`${url}/${id}`);
		const {success, error} = res.data;
		return success && !error ? res.data.result : null;
	},
	async addDonor(data) {
		const res = await axios.post(url, data);
		const { success, error } = res.data;
		return success && !error;
	},
	async editDonor(data) {
		const res = await axios.put(url, data);
		const { success, error } = res.data;
		return success && !error;
	},
	async deleteDonor(id) {
		const res = await axios.delete(`${url}/${id}`);
		const { success, error } = res.data;
		return success && !error;
	},
};
