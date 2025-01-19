import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnimation, IMyState } from "../../Interface/IMyInterface";
import { RootState } from "../store";


const initialState:IMyState = {
    isVisible:false,
    Animation:[],
    isVisibleBanner:true
}


export const stateSlice = createSlice({
    name:"states",
    initialState,
    reducers:{
        setVisible: (state,action:PayloadAction<boolean>) =>{
            state.isVisible = action.payload
        },
        
      addAnimation: (state, action: PayloadAction<IAnimation>) => {
  const { nameAnimation } = action.payload;

  // Controlla se l'animazione esiste già
  const exists = state.Animation.some(animation => animation.nameAnimation === nameAnimation);

  if (!exists) {
    // Aggiungi l'animazione solo se non esiste
    const newAnimation: IAnimation = {
      isComplete: action.payload.isComplete,
      nameAnimation: nameAnimation,
    };
    state.Animation.push(newAnimation);
  }
},
      
      setVisibleBanner:(state,action:PayloadAction<boolean>)=>{
        state.isVisibleBanner = action.payload;
      },

          setAnimation: (state, action: PayloadAction<{ nameAnimation: string, isComplete: boolean }>) => {
      const { nameAnimation, isComplete } = action.payload;
      const animationIndex = state.Animation.findIndex(
        (anim) => anim.nameAnimation === nameAnimation
      );
      if (animationIndex !== -1) {
        state.Animation[animationIndex].isComplete = isComplete;
      }
    },

    }
})


export const {setVisible,addAnimation,setVisibleBanner,setAnimation} = stateSlice.actions
export const selectVisible = (state:RootState) => state.myState

export default stateSlice.reducer