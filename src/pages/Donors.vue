<template>
    <div>
        <donors-table class="q-ma-md" :title="tableTitle" :columns="columns" :data="data"
                      :rowsKeys="['fullName', 'address', 'phoneNumber', 'mobileNumber',
                      'description',
                      ]" :loading="tableLoading" :table-pagination="pagination"
                      @reloadTable="pagination => reloadTable(pagination)"
                      @addNew="showAddDialog"
                      @edit="id => showEditDialog(id)"
                      @delete="showDeleteDialog"
        />
        <edit-donor ref="editDialog" @reloadTable="reloadTable" />
        <delete :what="2" :loading="deleteBtnLoading" @onDeleteButtonClicked="deleteDonor"
                ref="deleteDialog" />
    </div>
</template>

<script>
import DonorsTable from '../components/basic/Table.vue';
import EditDonor from "../components/donor/EditDonor.vue";
import Delete from "../components/basic/Delete.vue";
import notification from "../utils/notification";
import constants from "../utils/constants";
import { donorColumns } from '../utils/columns';

export default {
    components: {Delete, DonorsTable, EditDonor},
    data () {
        return {
            tableTitle:  "خیرین",
            tableLoading: false,
            deleteBtnLoading: false,
            toDeleteId: 0,
            pagination: {
                page: 1,
                rowsPerPage: 10,
                rowsNumber: null
            },
            columns: [],
            data: []
        };
    },
    methods: {
        async reloadTable (pagination = null) {
            this.tableLoading = true;
            if (pagination) {
                this.pagination.page = pagination.page;
                this.pagination.rowsPerPage = pagination.rowsPerPage;
                // console.log(this.pagination);
            }
            let { page, rowsPerPage } = this.pagination;
            let ans = await this.$api.donor.getDonors(page, rowsPerPage);
            if (ans) {
                // console.log(ans);
                this.pagination.rowsNumber = ans.totalCount;
                this.data = ans.items;
                this.tableLoading = false;
            }
        },
        showAddDialog () {
            this.$refs.addDialog.show();
        },
        showEditDialog (id) {
            this.$refs.editDialog.show(id);
        },
        showDeleteDialog(id) {
            this.toDeleteId = id;
            this.$refs.deleteDialog.show();
        },
        async deleteDonor() {
            this.deleteBtnLoading = true;
            try {
                let ans = await this.$api.donor.deleteDonor(this.toDeleteId);
                if (ans) {
                    this.$refs.deleteDialog.hide();
                    this.deleteBtnLoading = false;
                    this.reloadTable();
                    notification.showSuccessfulNotification(
                        'خیر' + ' ' + constants.messages.notification.onSuccessfullDelete,
                        null,
                        1500
                    );
                } else {
                    setTimeout(() => { this.deleteBtnLoading = false; }, 1000);
                    notification.showFailedNotification(
                        constants.messages.notification.onFailed,
                        null,
                        1500
                    );
                }
            } catch(e) {
                setTimeout(() => { this.deleteBtnLoading = false; }, 1000);
                notification.showFailedNotification(
                    constants.messages.notification.onConnectionError,
                    null,
                    1500
                );
            }
        },
    },
    computed: {},
    beforeMount () {
        this.columns = donorColumns;
        this.reloadTable();
    },
};
</script>
