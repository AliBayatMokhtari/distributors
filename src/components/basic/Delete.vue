<template>
    <q-dialog v-model="open" >
        <q-card style="width: 300px;">
            <q-bar class="row bg-primary text-white" style="height: 40px;">
                <h6>{{ dialogContent.title }}</h6>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup />
            </q-bar>
            <q-card-section>
                {{ dialogContent.message }}
            </q-card-section>
            <q-card-actions align="right">
                <q-btn color="negative" label="خیر" flat v-close-popup />
                <q-btn label="بله" color="primary" :loading="loading"
                       @click="$emit('onDeleteButtonClicked')" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: {
        what: { type: Number, required: true },
        loading: { type: Boolean, required: true }
    },
    data() {
        return {
            open: false
        };
    },
    methods: {
        show() {
            this.open = true;
        },
        hide() {
            this.open = false;
        },
    },
    computed: {
        dialogContent() {
            switch(this.what) {
                case 1:
                    return { title: 'حذف موزع', message:
                            'شما در حال حذف موزع هستید. ادامه می‌دهید؟' };
                case 2:
                    return { title: 'حذف خیر', message: 'شما در حال حذف خیر هستید. ادامه می‌دهید؟'};
                default:
                    return 'حذف';
            }
        }
    }
};
</script>
