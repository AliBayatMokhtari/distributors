<template>
    <div>
        <donors-table :title="tableTitle" :columns="columns" :data="data"
                      :rowsKeys="['fullName', 'address', 'phoneNumber', 'mobileNumber',
                      'description',
                      ]" :loading="tableLoading" :table-pagination="pagination"
                      @reloadTable="pagination => reloadTable(pagination)"
                      @addNew="showAddDialog"
                      @edit="id => showEditDialog(id)"
        />
        <edit-donor ref="editDialog" @reloadTable="reloadTable" />
    </div>
</template>

<script>
import DonorsTable from '../components/basic/Table.vue';
import EditDonor from "../components/donor/EditDonor.vue";
import notification from "../utils/notification";
import { donorColumns } from '../utils/columns';

export default {
    components: {DonorsTable, EditDonor},
    data () {
        return {
            tableTitle:  "خیرین",
            tableLoading: false,
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
    },
    computed: {},
    beforeMount () {
        this.columns = donorColumns;
        this.reloadTable();
    },
};
</script>
