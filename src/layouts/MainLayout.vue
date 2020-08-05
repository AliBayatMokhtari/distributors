<template>
	<q-layout class="layout" view="lHh Lpr lFf">
		<splash-screen v-if="isLoading" />
		<div v-else>
			<q-header elevated class="bg-primary fixed-top header">
				<q-toolbar>
					<q-btn
						flat
						dense
						round
						icon="menu"
						aria-label="Menu"
						@click="leftDrawerOpen = !leftDrawerOpen"
					/>

					<q-toolbar-title>
						موزعین
					</q-toolbar-title>
				</q-toolbar>
			</q-header>

			<q-drawer
				v-model="leftDrawerOpen"
				show-if-above
				bordered
				content-class="bg-grey-2 drawer_content"
				:width="200"
			>
				<q-list class="q-mt-xl">
					<q-item-label header class="text-grey-8"></q-item-label>
					<EssentialLink
						v-for="link in essentialLinks"
						:key="link.title"
						v-bind="link"
					/>
				</q-list>
			</q-drawer>
		</div>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import EssentialLink from "../components/EssentialLink.vue";
import SplashScreen from "../pages/SplashScreen.vue";
import { mapGetters } from "vuex";

const linksData = [
	{
		title: "داشبورد",
		icon: "dashboard",
		link: "/",
	},
	{
		title: "موزعین",
		icon: "person",
		link: "/distributors",
	},
	{
		title: "خیرین",
		icon: "person",
		link: "/donors",
	},
	// {
	// 	title: "خیرین",
	// 	icon: "person",
	// 	link: "/donors",
	// },
	{
		title: "تنظیمات",
		icon: "settings",
		link: "/settings",
	},
];

export default {
	name: "MainLayout",
	components: { EssentialLink, SplashScreen },
	data() {
		return {
			leftDrawerOpen: false,
			essentialLinks: linksData,
		};
	},
	computed: { ...mapGetters("loading", ["isLoading"]) },
};
</script>
