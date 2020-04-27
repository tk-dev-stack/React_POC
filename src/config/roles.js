const components = {
	search: {
		component: 'Search',
		url: '/search',
		title: 'Search',
		icon: 'menu',
		module: 1
	},
	released: {
		component: 'ReleasedDetails',
		url: '/released',
		title: 'Released details',
		icon: 'menu',
		module: 1
	},
	completed: {
		component: 'CompletedDetails',
		url: '/completed',
		title: 'Completed details',
		icon: 'menu',
		module: 1
	},
	emailrecipients: {
		component: 'EmailRecipients',
		url: '/emailrecipient',
		title: 'Manage email recipients',
		icon: 'menu',
		module: 1
	},
	manageuser: {
		component: 'ManageUser',
		url: '/manageuser',
		title: 'Manage user',
		icon: 'menu',
		module: 1
	}
};

// modules for grouping.
const modules = {
	0: {
		title: 'Search',
		icon: 'Search',
		isExpendable: true
	}
};

// component's access to roles.
const rolesConfig = {
	admin: {
		routes: [...Object.values(components)]
	},
	microlabanalyst: {
		routes: [
			components.search
		]
	},
	phsanalyst: {
		routes: [components.released]
	}
};

export { modules, rolesConfig };