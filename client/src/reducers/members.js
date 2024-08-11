export default (members = [], action) => {
  switch (action.type) {
      case 'FETCH_ALL_MEMBERS':
          return action.payload;
      case 'ADD_MEMBER':
          return [...members, action.payload];
      case 'DELETE_MEMBER':
          return members.filter(member => member._id !== action.payload);
      default:
          return members;
  }
};