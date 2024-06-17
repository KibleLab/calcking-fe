export interface QuestionArray {
  question_number: number;
  first_number: number;
  last_number: number;
  answer: number;
  operator: string;
}

export interface QuestionJSON {
  questions_id: string;
  questions_title: string;
  questions_level: string;
  questions: QuestionArray[];
}

export interface QuestionJSONArray {
  questionJSONArray: QuestionJSON[];
}
