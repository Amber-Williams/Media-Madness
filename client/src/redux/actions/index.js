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

export const changeScreenStages = (status) => {
	return {
		type: 'CHANGING_SCREEN_STAGES',
		status
	}
}

export const addMessage = (status) => {
	return {
		type: 'ADD_GAME_MESSAGE',
		status
	}
}

export const setGameRoundVotes = (status) => {
	return {
		type: 'SET_GAME_ROUND_VOTES',
		status
	}
}

export const incGameRound = () => {
	return {
		type: 'INC_GAME_ROUND'
	}
}