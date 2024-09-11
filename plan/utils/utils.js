
export const clearDuplicates = (arr)=>{
  const seenIds = {};
  return arr.filter(obj => {
    if (!seenIds[obj.id]) {
      seenIds[obj.id] = true;
      return true;
    }
    return false;
  });
}
