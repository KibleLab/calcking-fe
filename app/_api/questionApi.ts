import axiosInstance from './axiosInstance';

export async function getUnitsToUnits(params: { numberOfQuestions: number; carry: number }) {
  return axiosInstance.get('/gen-questions/add/units-to-units', { params });
}
