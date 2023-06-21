import { useMutation } from '@tanstack/react-query';

import answerChart from '../controllers/answerChart';

const useAnswerChart = () => {
  const mutation = useMutation({
    mutationFn: answerChart,
  });

  return mutation;
};

export default useAnswerChart;
