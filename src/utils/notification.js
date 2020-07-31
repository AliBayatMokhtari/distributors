import { Notify } from "quasar";

export default {
	showSuccessfulNotification(message, caption, timeout) {
		Notify.create({
			type: "positive",
			message,
			caption,
			timeout,
		});
	},
	showFailedNotification(message, caption, timeout) {
		Notify.create({
			type: "negative",
			message,
			caption,
			timeout,
		});
	},
};
