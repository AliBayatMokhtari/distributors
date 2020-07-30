const quitLoadingState = state => {
	console.log("before mutation", state.isLoading);
	state.isLoading = false;
	console.log("after mutation", state.isLoading);
};

export { quitLoadingState };
