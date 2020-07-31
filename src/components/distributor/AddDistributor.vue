<template>
	<q-dialog v-model="open" position="bottom" maximized>
		<q-card style="width: 100%;">
			<q-bar class="bg-primary text-white" style="height: 50px">
				<h6 class="q-my-none">{{ dialogTitle }}</h6>
				<q-space />
				<q-btn class="q-mt-xs" dense flat icon="close" round v-close-popup />
			</q-bar>

			<q-card-section class="row q-col-gutter-x-lg q-col-gutter-y-sm">
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-4"
					label="نام"
					ref="firstName"
					v-model="distributor.firstName"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-4"
					label="نام خانوادگی"
					ref="lastName"
					v-model="distributor.lastName"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-4"
					label="کد ملی"
					ref="nationalId"
					v-model="distributor.nationalId"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-4"
					label="تلفن همراه"
					ref="mobileNumber"
					v-model="distributor.mobileNumber"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-4"
					label="رمز عبور"
					ref="password"
					v-model="distributor.password"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-4"
					label="تکرار رمز عبور"
					ref="confirmPassword"
					v-model="distributor.confirmPassword"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12"
					label="توضیحات"
					ref="description"
					v-model="distributor.description"
				/>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn
					@click="add"
					color="primary"
					label="ایجاد"
					:loading="addButtonLoading"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
import rules from "../../utils/rules";
import notification from "../../utils/notification";
import constants from "../../utils/constants";

export default {
	data: () => ({
		open: false,
		dialogTitle: "موزع جدید",
		addButtonLoading: false,
		confirmPassword: "",
		rules: {},
		distributor: {
			firstName: "",
			lastName: "",
			nationalId: "",
			mobileNumber: "",
			password: "",
			description: "",
		},
	}),
	methods: {
		show() {
			this.open = true;
		},
		hide() {
			this.open = false;
			this.resetForm();
		},
		resetForm() {
			this.distributor = {
				firstName: "",
				lastName: "",
				nationalId: "",
				mobileNumber: "",
				password: "",
				description: "",
			};
		},
		isFormValid() {
			this.$refs.firstName.validate();
			this.$refs.lastName.validate();
			this.$refs.nationalId.validate();
			this.$refs.mobileNumber.validate();
			this.$refs.password.validate();
			this.$refs.confirmPassword.validate();
			return !(
				this.$refs.firstName.hasError ||
				this.$refs.lastName.hasError ||
				this.$refs.nationalId.hasError ||
				this.$refs.password.hasError ||
				this.$refs.confirmPassword.hasError
			);
		},
		async add() {
			this.addButtonLoading = true;
			if (this.isFormValid()) {
				try {
					let ans = await this.$api.distributor.addDistributor(
						this.distributor
					);
					if (ans) {
						this.addButtonLoading = false;
						this.hide();
						this.$emit("reloadTable");
						notification.showSuccessfulNotification(
							this.successAddMessage,
							null,
							1500
						);
					} else {
						setTimeout(() => {
							this.addButtonLoading = false;
						}, 1000);
						notification.showFailedNotification(
							constants.messages.notification.onFailed,
							null,
							1500
						);
					}
				} catch (err) {
					setTimeout(() => {
						this.addButtonLoading = false;
					}, 1000);
					notification.showFailedNotification(
						constants.messages.notification.onConnectionError,
						null,
						1500
					);
				}
			} else {
				setTimeout(() => {
					this.addButtonLoading = false;
				}, 1000);
			}
		},
	},
	computed: {
		successAddMessage() {
			return "موزع" + " " + constants.messages.notification.onSuccessfullCreate;
		},
	},
	mounted() {
		this.rules = rules;
	},
};
</script>
