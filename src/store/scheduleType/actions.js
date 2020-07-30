import api from "../../boot/api";

const getScheduleTypes = async ({ commit }) => {
	let response = await api.scheduleType.getScheduleTypes();
	if (response) {
		commit("setScheduleTypes", response);
	}
};

export { getScheduleTypes };
