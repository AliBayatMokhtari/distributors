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
					class="col-12 col-sm-3"
					label="نام"
					ref="firstName"
					v-model="distributor.firstName"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-3"
					label="نام خانوادگی"
					ref="lastName"
					v-model="distributor.lastName"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-3"
					label="کد ملی"
					ref="nationalId"
					v-model="distributor.nationalId"
				/>
				<q-input
					:rules="[val => !!val || rules.common.required]"
					class="col-12 col-sm-3"
					label="تلفن همراه"
					ref="mobileNumber"
					v-model="distributor.mobileNumber"
				/>
				<q-input
					class="col-12"
					label="توضیحات"
					ref="description"
					v-model="distributor.description"
				/>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn
					@click="edit"
					color="primary"
					label="ویرایش"
					:loading="editButtonLoading"
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
		editButtonLoading: false,
		dialogTitle: "ویرایش موزع",
		rules: {},
		distributor: {
			id: 0,
			firstName: "",
			lastName: "",
			mobileNumber: "",
			nationalId: "",
			description: "",
		},
	}),
	methods: {
		assignEditingDistributor(information) {
			this.distributor.id = information.id;
			this.distributor.firstName = information.firstName;
			this.distributor.lastName = information.lastName;
			this.distributor.nationalId = information.nationalId;
			this.distributor.mobileNumber = information.mobileNumber;
			this.distributor.description = information.description;
		},
		async show(id) {
			try {
				let ans = await this.$api.distributor.getDistributor(id);
				if (ans) {
					this.assignEditingDistributor(ans);
					this.open = true;
				} else {
					notification.showFailedNotification(
						constants.notification.onConnectionError,
						null,
						1500
					);
				}
			} catch (err) {
				notification.showFailedNotification(
					constants.notification.onConnectionError,
					null,
					1500
				);
			}
		},
		hide() {
			this.open = false;
		},
		async edit() {
			this.editButtonLoading = true;
			if (this.isFormValid()) {
				try {
					const ans = await this.$api.distributor.editDistributor(
						this.distributor
					);
					if (ans) {
						this.editButtonLoading = false;
						this.hide();
						this.$emit("reloadTable");
						notification.showSuccessfulNotification(
							this.successfulEdit,
							null,
							1500
						);
					} else {
						setTimeout(() => {
							this.editButtonLoading = false;
						}, 1500);
						notification.showFailedNotification(
							constants.notification.onFailed,
							null,
							1500
						);
					}
				} catch (err) {
					setTimeout(() => {
						this.editButtonLoading = false;
						this.hide();
						this.$emit("reloadTable");
					}, 1500);
					notification.showFailedNotification(
						constants.notification.onConnectionError,
						null,
						1500
					);
				}
			} else {
				setTimeout(() => {
					this.editButtonLoading = false;
				}, 1000);
			}
		},
		isFormValid() {
			this.$refs.firstName.validate();
			this.$refs.lastName.validate();
			this.$refs.nationalId.validate();
			this.$refs.mobileNumber.validate();
			return !(
				this.$refs.firstName.hasError ||
				this.$refs.lastName.hasError ||
				this.$refs.nationalId.hasError ||
				this.$refs.mobileNumber.hasError
			);
		},
	},
	computed: {
		successfulEdit() {
			return "موزع" + " " + constants.messages.notification.onSuccessfullEdit;
		},
	},
	mounted() {
		this.rules = rules;
	},
};
</script>
