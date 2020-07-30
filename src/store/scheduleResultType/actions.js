import api from "../../boot/api";

const getScheduleResultTypes = async ({ commit }) => {
	let response = await api.scheduleResultType.getScheduleResultTypes();
	if (response) {
		commit("setScheduleResultTypes", response);
	}
};

export { getScheduleResultTypes };
