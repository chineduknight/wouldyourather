import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion } from "type";

export interface QuestionsState {
  all: Record<string, IQuestion> | null;
  question: IQuestion | null;
}

const initialState: QuestionsState = {
  all: null,
  question: null,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    updateQuestions: (state: QuestionsState, action: PayloadAction<Record<string, any>>) => {
      state.all = action.payload;
    },
    resetQuestions: (state: QuestionsState) => {
      state.all = null;
    },
    setQuestion: (state: QuestionsState, action: PayloadAction<IQuestion>) => {
      state.question = action.payload;
    },
  },
});

export const { updateQuestions, resetQuestions, setQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
