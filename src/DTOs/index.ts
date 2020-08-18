import * as yup from 'yup';

export const eventDTOSchema = yup
  .object()
  .shape({
    type: yup.mixed().oneOf(['deposit', 'withdraw', 'transfer']).required(),
    destination: yup.string(),
    origin: yup.string(),
    amount: yup.number().positive().required(),
  })
  .required();

export type eventDTO = yup.InferType<typeof eventDTOSchema>;

export type balanceUpdateDTO = {
  id: string;
  balance: number;
};

export type processedEventDTO = {
  origin?: balanceUpdateDTO;
  destination?: balanceUpdateDTO;
};
