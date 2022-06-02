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

// type DispatchType = (args: ArticleAction) => ArticleAction;
