<template>
	<div>
		<distributors-table
			class="q-ma-md"
			:data="data"
			:columns="columns"
			:rowsKeys="[
				'firstName',
				'lastName',
				'nationalId',
				'mobileNumber',
				'description',
			]"
			:loading="tableLoading"
			:title="tableTitle"
			:tablePagination="pagination"
			@reloadTable="pagination => reloadTable(pagination)"
			@addNew="showAddDialog"
			@edit="id => showEditDialog(id)"
			@delete="showDeleteDialog"
			:what="1"
		/>

		<add-distributor ref="addDialog" @reloadTable="reloadTable" />
		<edit-distributor ref="editDialog" @reloadTable="reloadTable" />
		<delete :what="1" ref="deleteDialog" @onDeleteButtonClicked="deleteDistributor"
				:loading="deleteBtnLoading" />
	</div>
</template>

<script>
import DistributorsTable from "../components/basic/Table.vue";
import AddDistributor from "../components/distributor/AddDistributor.vue";
import EditDistributor from "../components/distributor/EditDistributor.vue";
import Delete from "../components/basic/Delete.vue";
import { distributorsColumns } from "../utils/columns";
import notification from "../utils/notification";
import constants from "../utils/constants";

export default {
	components: { DistributorsTable, AddDistributor, EditDistributor, Delete },
	data: () => ({
		data: [],
		columns: [],
		tableLoading: false,
		tableTitle: "موزعین",
		deleteBtnLoading: false,
		distributorToDeleteId: 0,
		pagination: {
			page: 1,
			rowsPerPage: 10,
			rowsNumber: null,
		},
	}),
	methods: {
		async reloadTable(pagination = null) {
			this.tableLoading = true;
			if (pagination) {
				this.pagination.page = pagination.page;
				this.pagination.rowsPerPage = pagination.rowsPerPage;
				console.log(this.pagination);
			}
			let { page, rowsPerPage } = this.pagination;
			let ans = await this.$api.distributor.getDistributors(page, rowsPerPage);
			if (ans) {
				this.pagination.rowsNumber = ans.totalCount;
				this.data = ans.items;
				this.tableLoading = false;
			}
		},
		async deleteDistributor() {
			this.deleteBtnLoading = true;
			try {
				let ans = await this.$api.distributor.deleteDistributor(this.distributorToDeleteId);
				if (ans) {
					// successful delete message
					notification.showSuccessfulNotification(
						this.onSuccessfulDeleteMessage,
						null,
						1500
					);
					// clear btn loading flag
					this.deleteBtnLoading = false;
					// hide dialog
					this.$refs.deleteDialog.hide();
					// reload table
					this.reloadTable();
				} else {
					setTimeout(() => { this.deleteBtnLoading = false; }, 1000);
					notification.showFailedNotification(
						constants.messages.notification.onFailed,
						null,
						1500
					);
				}
			} catch (e) {
				setTimeout(() => { this.deleteBtnLoading = false; }, 1000);
				notification.showFailedNotification(
					constants.messages.notification.onConnectionError,
					null,
					1500
				);
			}
		},
		showAddDialog() {
			this.$refs.addDialog.show();
		},
		showEditDialog(id) {
			this.$refs.editDialog.show(id);
		},
		showDeleteDialog(id) {
			this.distributorToDeleteId = id;
			this.$refs.deleteDialog.show();
		}
	},
	computed: {
		onSuccessfulDeleteMessage() {
			return 'موزع' + ' ' + constants.messages.notification.onSuccessfullDelete;
		}
	},
	beforeMount () {
		this.columns = distributorsColumns;
		this.reloadTable();
	},
};
</script>
