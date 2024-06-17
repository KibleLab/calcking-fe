import axiosInstance from './axiosInstance';

export async function getUnitsToUnits(params: { numberOfQuestions: number; carry: number }) {
  return axiosInstance.get('/gen-questions/add/units-to-units', { params });
}

export async function getHundsTensUnitsToHundsTensUnits(params: {
  numberOfQuestions: number;
  carry: number;
}) {
  return axiosInstance.get('/gen-questions/add/hunds-tens-units-to-hunds-tens-units', { params });
}

export async function getGenAnswerAdd(params: { questionsID: string }) {
  return axiosInstance.get('/gen-answers/add', { params });
}
