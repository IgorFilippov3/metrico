export interface SendMailParams {
  title: string;
  htmlTemplate: string;
  customId: string;
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  };
}