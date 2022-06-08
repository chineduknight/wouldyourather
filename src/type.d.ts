/* eslint-disable no-unused-vars */
export interface IQuestion {
  id: string;
  author: string;
  timestamp: number;
  optionOne: {
    votes: Array<string>;
    text: string;
  };
  optionTwo: {
    votes: Array<string>;
    text: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  avatarURL: string;
  answers: Record<string, string>;
  questions: Array<string>;
}
export const DEFAULT_USER = {
  id: "",
  name: "",
  avatarURL: "",
  answers: {},
  questions: [],
};
// type DispatchType = (args: ArticleAction) => ArticleAction;
