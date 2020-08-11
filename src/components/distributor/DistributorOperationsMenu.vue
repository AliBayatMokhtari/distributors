<template>
    <q-menu>
        <q-list dense style="min-width: 100px">
            <q-item class="text-primary" clickable
                    @click="$emit('edit')" v-close-popup>
                <q-item-section class="q-px-sm" side>
                    <q-icon color="primary" name="edit" size="xs" />
                </q-item-section>
                <q-item-section>ویرایش</q-item-section>
            </q-item>
            <q-item class="text-negative" clickable @click="$emit('wantToDelete')"
                    v-close-popup>
                <q-item-section class="q-px-sm q-mb-xs" side>
                    <q-icon color="negative" name="delete" size="xs" />
                </q-item-section>
                <q-item-section>حذف</q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>
