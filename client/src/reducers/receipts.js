export default ( receipts = [], action) => {
    switch (action.type) {
        case 'DELETE':
            return receipts.filter((receipt) => receipt._id !== action.payload);
        case 'UPDATE':
            return receipts.map((receipt) => receipt._id === action.payload._id ? action.payload : receipt);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [ ...receipts, action.payload];
        default:
            return receipts;
    }

}