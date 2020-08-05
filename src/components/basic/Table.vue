<template>
	<transition appear enter-active-class="animated animate__backInRight">
		<q-table
			:columns="columns"
			:data="data"
			:loading="loading"
			:rows-per-page-options="[10, 15, 20]"
			rows-per-page-label="تعداد سطر‌های جدول"
			:title="title"
			row-key="name"
			:table-header-class="tableHeaderClass"
			:pagination.sync="pagination"
			@request="onRequest"
		>
			<template v-slot:loading>
				<q-linear-progress color="primary" query />
			</template>

			<template v-slot:top>
				<div class="col">
					<div class="text-h5 q-mb-sm">{{ title }}</div>
					<div class="row">
						<q-input color="primary" debounce="500" dense placeholder="جستجو">
							<template v-slot:prepend>
								<q-icon name="search" />
							</template>
						</q-input>
						<q-space />
						<q-btn
							@click="$emit('addNew')"
							color="primary"
							icon="add"
							label="جدید"
						/>
					</div>
				</div>
			</template>

			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th
						v-for="col in props.cols"
						:key="col.name"
						:props="props"
						class="bg-primary text-white"
					>
						{{ col.label }}
					</q-th>
				</q-tr>
			</template>

			<template v-slot:body="props">
				<q-tr>
					<q-td v-for="rowKey in rowsKeys" :key="rowKey" :props="props">
						{{ props.row[rowKey] }}
					</q-td>
					<q-td :props="props" key="operations">
						<div class="flex justify-end q-gutter-x-xs">
							<q-btn
								@click="$emit('edit', props.row.id)"
								color="warning"
								dense
								flat
								icon="edit"
								round
							/>
							<q-btn
								@click="$emit('delete', props.row.id)"
								color="negative"
								dense
								flat
								icon="delete"
								round
							/>
							<div class="flex justify-end q-gutter-x-xs">
								<!-- TODO: just for distributors -->
							</div>
						</div>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</transition>
</template>

<script>
export default {
	props: {
		data: { type: Array, required: true },
		columns: { type: Array, required: true },
		rowsKeys: { type: Array, required: true },
		loading: { type: Boolean, required: true },
		title: { type: String, required: true },
		tableHeaderClass: { type: String, default: "bg-primary text-white" },
		tablePagination: { type: Object, required: true },
	},
	data: () => ({
		pagination: {
			page: 1,
			rowsPerPage: 10,
			rowsNumber: null,
		},
	}),
	methods: {
		onRequest({ pagination }) {
			this.$emit("reloadTable", pagination);
		},
	},
	computed: {},
	mounted() {
		this.pagination = this.tablePagination;
	},
};
</script>
