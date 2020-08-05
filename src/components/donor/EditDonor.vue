<template>
    <q-dialog v-model="open" position="bottom" maximized>
        <q-card style="width: 100%">
            <q-bar class="bg-primary text-white" style="height: 50px">
                <h6 class="q-my-none">{{ dialogTitle }}</h6>
                <q-space />
                <q-btn class="q-mt-xs" dense flat icon="close" round v-close-popup />
            </q-bar>
            <q-card-section class="row q-col-gutter-x-lg q-col-gutter-y-sm">
                <q-input
                    :rules="[val => !!val || rules.common.required]" class="col-12 col-sm-4"
                    label="نام کامل" ref="fullName" v-model="donor.fullName"
                />
                <q-input :rules="[val => !!val || rules.common.required]" class="col-12 col-sm-4"
                    label="تلفن ثابت" ref="phoneNumber" v-model="donor.phoneNumber"
                />
                <q-input
                    :rules="[val => !!val || rules.common.required]" class="col-12 col-sm-4"
                    label="تلفن همراه" ref="mobileNumber" v-model="donor.mobileNumber"
                />
                <q-input
                    class="col-12 col-sm-4 q-mb-md q-pb-xs"
                    label="مکان روی نقشه" ref="geoLocation" v-model="donor.geoLocation"
                />
                <q-input :rules="[val => !!val || rules.common.required]" class="col-12 col-sm-8"
                         label="آدرس" ref="address"
                         v-model="donor.address"
                />
                <q-input class="col-12" label="توضیحات" ref="description"
                         v-model="donor.description"
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
import notification from "../../utils/notification";
import constants from "../../utils/constants";
import rules from "../../utils/rules";

export default {
    data () {
        return {
            open: false,
            editButtonLoading: false,
            dialogTitle: "ویرایش خیر",
            rules: {},
            donor: {
                id: 0,
                fullName: "",
                address: "",
                phoneNumber: "",
                mobileNumber: "",
                geoLocation: "",
                description: ""
            }
        };
    },
    methods: {
        async show(id) {
            try {
                let ans = await this.$api.donor.getDonor(id);
                if (ans) {
                    this.setDonor(ans);
                    this.open = true;
                } else {
                    notification.showFailedNotification(
                        constants.messages.notification.onFailed,
                        null,
                        1500
                    );
                }
            } catch (e) {
                notification.showFailedNotification(
                    constants.messages.notification.onFailed,
                    null,
                    1500
                );
            }
        },
        hide() {
            this.open = false;
        },
        setDonor(information) {
            this.donor.id = information.id;
            this.donor.fullName = information.fullName;
            this.donor.address = information.address;
            this.donor.phoneNumber = information.phoneNumber;
            this.donor.mobileNumber = information.mobileNumber;
            this.donor.geoLocation = information.geolocation;
            this.donor.description = information.description;
        },
        async edit () {
            this.editButtonLoading = true;
            if (this.isFormValid()) {
                try {
                    const ans = await this.$api.donor.editDonor(this.donor);
                    if (ans) {
                        this.hide();
                        this.editButtonLoading = false;
                        this.$emit('reloadTable');
                        notification.showSuccessfulNotification(
                            this.successfulDonorEditMessage,
                            null,
                            1500
                        );
                    } else {
                        setTimeout(() => {
                            this.editButtonLoading = false;
                        }, 1000);
                        notification.showFailedNotification(
                            constants.messages.notification.onFailed,
                            null,
                            1500
                        );
                    }
                } catch (e) {
                    setTimeout(() => {
                        this.editButtonLoading = false;
                    }, 1000);
                    notification.showFailedNotification(
                        constants.messages.notification.onConnectionError,
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
            this.$refs.fullName.validate();
            this.$refs.address.validate();
            this.$refs.phoneNumber.validate();
            this.$refs.mobileNumber.validate();
            return !(
                this.$refs.fullName.hasError ||
                this.$refs.address.hasError ||
                this.$refs.phoneNumber.hasError ||
                this.$refs.mobileNumber.hasError

            );
        }
    },
    computed: {
        successfulDonorEditMessage() {
            return 'خیر' + ' ' + constants.messages.notification.onSuccessfullEdit;
        }
    },
    mounted () {
        this.rules = rules;
    }
};
</script>
