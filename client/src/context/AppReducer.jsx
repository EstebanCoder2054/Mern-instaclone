export default (state, action) => {
    switch(action.type){

        case 'STOCK_USER':
            return{
                ...state,
                user: action.payload
            }

        case 'GET_POSTS':
            return{
                ...state,
                loading: false,
                posts: action.payload
            }

        case 'CLEAR_USER':
            return{
                ...state,
                user: null
            }

        // case 'DELETE_TRANSACTION':
        //     return{
        //         ...state,
        //         transactions: state.transactions.filter(transaction => transaction._id !== action.payload )
        //     }

        // case 'ADD_TRANSACTION':
        //     return{
        //         ...state,
        //         transactions: [...state.transactions, action.payload]
        //         // transactions: state.transactions.push(action.payload)
        //     }

        case 'POSTS_ERROR':
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}