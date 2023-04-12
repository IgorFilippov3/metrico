import { PaddleAlert } from "../models/paddle-alert.enum";

export class PaddlePaymentDto {
  alert_id: string;
  alert_name: PaddleAlert;
  cancel_url: string;
  checkout_id: string;
  currency: string;
  email: string;
  event_time: string;
  linked_subscriptions: string;
  marketing_consent: string;
  next_bill_date: string;
  passthrough: string;
  quanity: string;
  source: string;
  status: string;
  subscription_id: string;
  subscription_plan_id: string;
  unit_price: string;
  update_url: string;
  user_id: string;
  p_signature: string;
}