<template>
	<div class="flex column flex-center bg-primary text-white fullscreen">
		<q-spinner color="white" size="3em" />
		<div class="text-h5 q-mt-md">{{ loadingMessage }}</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data: () => ({}),
	methods: {
		...mapActions("scheduleType", ["getScheduleTypes"]),
		...mapActions("scheduleResultType", ["getScheduleResultTypes"]),
		...mapActions("loading", ["quitLoadingState"]),
	},
	computed: {
		loadingMessage() {
			return "در حال بارگزاری سامانه موزعین";
		},
	},
	async mounted() {
		await this.getScheduleTypes();
		await this.getScheduleResultTypes();
		setTimeout(() => {
			this.quitLoadingState();
		}, 1000);
	},
};
</script>
