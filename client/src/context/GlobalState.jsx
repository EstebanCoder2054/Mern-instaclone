import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//initial state
const initialState = {
    user: {
        //DUMMY DATA
        // _id: '5f53b3eb36a85d0b8c1058dd', name: 'Estebandido', email: 'estebandido@esteban.com'
    },
    posts: [],
    error: null,
    loading: true
}

//create the global context - para poder exportar esta data a otros archivos
export const GlobalContext = createContext(initialState);

//el provider es el encargado de entregar esta data a los demás archivos/componentes
// el provider será el padre de los componentes, por ende se usa el objeto children
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //acciones!!!

    async function stockUser(userData){
        // el dispatch se usa para mandar valores al reducer (AppReducer en este caso)
        // el payload es la data que se quiere enviar
        try {
            dispatch({
                type: 'STOCK_USER',
                payload: userData
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function clearUser(){
        try {
            dispatch({
                type: 'CLEAR_USER',
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function getPosts(){
        // el dispatch se usa para mandar valores al reducer (AppReducer en este caso)
        // el payload es la data que se quiere enviar
        try {
            const response = await axios.get('/allpost');
            dispatch({
                type: 'GET_POSTS',
                payload: response.data.posts
            })
        } catch (error) {
            dispatch({
                type: 'POSTS_ERROR',
                payload: error
            })
        }
    }

    // async function deleteTransaction(id){
    //     // el dispatch se usa para mandar valores al reducer (AppReducer en este caso)
    //     // el payload es la data que se quiere enviar
    //     try {
    //         await axios.delete(`/api/v1/transactions/${id}`)
    //         dispatch({
    //             type: 'DELETE_TRANSACTION',
    //             payload: id
    //         }); 
    //     } catch (error) {
    //         dispatch({
    //             type: 'TRANSACTION_ERROR',
    //             payload: error.response.data.error
    //         })
    //     }
    // }

    // async function addTransaction(transaction){
    //     // el dispatch se usa para mandar valores al reducer (AppReducer en este caso)
    //     // el payload es la data que se quiere enviar

    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     try {
    //         const response = await axios.post('/api/v1/transactions', transaction, config);
    //         dispatch({
    //             type: 'ADD_TRANSACTION',
    //             payload: response.data.data
    //         }); 
    //     } catch (error) {
    //         dispatch({
    //             type: 'TRANSACTION_ERROR',
    //             payload: error.response.data.error
    //         })
    //     };
    // }

    return(
        <GlobalContext.Provider value={{
            user: state.user,
            posts: state.posts,
            error: state.error,
            loading: state.loading,
            getPosts: getPosts,
            stockUser: stockUser,
            clearUser: clearUser
            // addTransaction: addTransaction,
            // deleteTransaction: deleteTransaction,
        }}>
            {children}
        </GlobalContext.Provider>
    )

}