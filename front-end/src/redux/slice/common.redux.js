const handleAsyncActions = (builder, action, handleFulfilled) => {
	builder
		.addCase(action.pending, (state) => {
			state.loading = true;
		})
		.addCase(action.fulfilled, (state, action) => {
			state.loading = false;
			handleFulfilled(state, action);
		})
		.addCase(action.rejected, (state) => {
			state.loading = false;
		});
};

export default handleAsyncActions;
