import {createGlobalState} from 'react-hooks-global-state'
const {setGlobalState,useGlobalState,getGlobalState}=createGlobalState({
     lat: 10.762622,
     lng: 106.660172
})
export {useGlobalState,setGlobalState,getGlobalState};