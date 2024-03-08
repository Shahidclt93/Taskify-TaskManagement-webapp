export const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('boardData');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('boardData', serializedState);
    } catch (err) {
      console.log(err)
    }
  };