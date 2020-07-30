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
		/>
	</div>
</template>

<script>
import DistributorsTable from "../components/basic/Table.vue";
import { distributorsColumns } from "../utils/columns";
import distributor from "../api/distributor";

export default {
	components: { DistributorsTable },
	data: () => ({
		data: [],
		columns: [],
		tableLoading: false,
		tableTitle: "موزعین",
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
	},
	computed: {},
	beforeMount() {
		this.columns = distributorsColumns;
		this.reloadTable();
	},
};
</script>
