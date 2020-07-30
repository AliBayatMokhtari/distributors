const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{ path: "/", component: () => import("pages/Dashboard.vue") },
			{ path: "/settings", component: () => import("pages/Settings.vue") },
			{
				path: "/distributors",
				component: () => import("pages/distributors.vue"),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "*",
		component: () => import("pages/Error404.vue"),
	},
];

export default routes;
