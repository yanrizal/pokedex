import axios from 'axios';
import { APIBaseUrl } from '../config'

export const getPokeList = credential => (dispatch, getState) => {
	let fetchLoad = {
	  method: 'get',
	  baseURL: APIBaseUrl,
	  url: `pokemon`,
	  params: credential,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	}
	return new Promise((resolve, reject) => {
	axios(fetchLoad)
	  .then(function (response) {
		resolve(response)
		dispatch({type: 'GET_POKELIST_SUCCESS', data: response.data});
	  })
	  .catch(function (error) {
      	reject(error.response)
	  });
	})
};

export const clearPokeList = credential => (dispatch, getState) => {
	dispatch({type: 'CLEAR_POKELIST_SUCCESS'});
}

export const resetPokeCompare = credential => (dispatch, getState) => {
	dispatch({type: 'RESET_POKECOMPARE_SUCCESS'});
}

export const addComparePoke1 = credential => (dispatch, getState) => {
	dispatch({type: 'ADD_POKECOMPARE_SUCCESS', data: credential});
}

export const addComparePoke2 = credential => (dispatch, getState) => {
	dispatch({type: 'ADD_POKECOMPARE2_SUCCESS', data: credential});
}

export const getPokeDetail = (credential,type) => (dispatch, getState) => {
	let fetchLoad = {
	  method: 'get',
	  baseURL: APIBaseUrl,
	  url: `pokemon/${credential}`,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	}
	return new Promise((resolve, reject) => {
	axios(fetchLoad)
	  .then(function (response) {
		resolve(response)
		if (type == 'poke1') {
			dispatch({type: 'GET_POKEDETAIL1_SUCCESS', data: response.data});
		} else if (type == 'poke2') {
			dispatch({type: 'GET_POKEDETAIL2_SUCCESS', data: response.data});
		} else {
			dispatch({type: 'GET_POKEDETAIL_SUCCESS', data: response.data});
		}
		
	  })
	  .catch(function (error) {
      	reject(error.response)
	  });
	})
};

export const getPokeTypes = credential => (dispatch, getState) => {
	let fetchLoad = {
	  method: 'get',
	  baseURL: APIBaseUrl,
	  url: `type`,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	}
	return new Promise((resolve, reject) => {
	axios(fetchLoad)
	  .then(function (response) {
		resolve(response)
		dispatch({type: 'GET_POKETYPE_SUCCESS', data: response.data});
	  })
	  .catch(function (error) {
      	reject(error.response)
	  });
	})
};

export const getPokeListByTypes = credential => (dispatch, getState) => {
	let fetchLoad = {
	  method: 'get',
	  baseURL: APIBaseUrl,
	  url: `type/${credential}`,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	}
	return new Promise((resolve, reject) => {
	axios(fetchLoad)
	  .then(function (response) {
		resolve(response)
		dispatch({type: 'GET_POKELISTBYTYPE_SUCCESS', data: response.data});
	  })
	  .catch(function (error) {
      	reject(error.response)
	  });
	})
};
  
  