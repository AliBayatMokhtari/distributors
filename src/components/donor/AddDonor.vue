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
import notification from "../../utils/notification";
export default {
    data() {
        return {
            open: false,
            dialogTitle: 'خیر جدید',
            donor: {
                fullName: '',
                address: '',
                phoneNumber: '',
                mobileNumber: '',
                
            }
        };
    },
    methods: {},
    computed: {}
};
</script>
