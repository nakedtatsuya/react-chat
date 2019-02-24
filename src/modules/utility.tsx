export const updateObject = (oldObject: any, updateObject: any) => {
      return {
          ...oldObject,
          ...updateObject
      }  ;
};