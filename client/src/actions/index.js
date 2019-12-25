export const isLoading = (status) => {
	return {
		type: 'DATA_LOADING',
		status
	}
}

export const loadFailure = (status) => {
	return {
		type: 'DATA_LOADING_FAILURE',
		status
	}
}