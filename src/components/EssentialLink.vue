<template>
	<q-item
		class="q-my-sm q-mx-md rounded essentialLink_item"
		clickable
		:to="link"
		style="display: flex; align-items: center;"
	>
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" />
		</q-item-section>

		<q-item-section>
			<q-item-label>{{ title }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script>
export default {
	name: "EssentialLink",
	props: {
		title: {
			type: String,
			required: true,
		},

		caption: {
			type: String,
			default: "",
		},

		link: {
			type: String,
			default: "#",
		},

		icon: {
			type: String,
			default: "",
		},
	},
};
</script>
