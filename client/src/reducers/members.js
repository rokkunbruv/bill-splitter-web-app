export default (members = [], action) => {
  switch (action.type) {
      case 'FETCH_ALL_MEMBERS':
          return action.payload;
      case 'ADD_MEMBER':
          return [...members, action.payload];
      default:
          return members;
  }
};