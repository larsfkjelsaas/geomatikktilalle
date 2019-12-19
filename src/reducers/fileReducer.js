const initialState = {
    result: 1,
    lastValues: []
  };
  
 export const fileReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FILES_UPLOADED":
        console.log(action.payload);
        break;
      default:
        break;
    }
    return state;
  };
