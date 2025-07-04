import userSlice from "./reactRedux/userSlice";
const actions = userSlice.actions;

export const fetchUserMiddleware = (param) =>{
    return async function(dispatch){
        try{
            dispatch(actions.userLoading());
            const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${param}`)
            const user = await resp.json();
            dispatch(actions.userData(user));
        }catch(err){
            dispatch(actions.userError(err));
        }finally{
            // dispatch(actions.userLoading());
        }
    };
};