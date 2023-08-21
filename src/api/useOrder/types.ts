export interface Article {
  articleNo: string;
  articleName: string;
  articleImageUrl: string | null;
  quantity: number;
  price: number;
}

export interface CheckpointMeta {
  delivery_date: string;
  delivery_time_frame_from: string;
  delivery_time_frame_to: string;
  pickup_address: string;
  pickup_address_link: string;
  pickup_address_map_url: string;
}

export enum CheckpointStatus {
    Registered = "Registered",
    NewDeliveryDateSet = "New delivery date set",
    FailedDeliveryAttempt = "Failed delivery attempt",
    InTransit = "In transit",
    ReadyForCollection = "Ready for collection",
}

export interface Checkpoint {
    status_details: string;
    event_timestamp: string;
    status: CheckpointStatus;
    country_iso3: string;
    city: string;
    meta?: Partial<CheckpointMeta>;
}

export interface DeliveryInfo {
    articles: Partial<Article>[];
    orderNo: string;
    order_date: string;
    recipient: string;
    recipient_notification: string;
    email: string;
    street: string;
    city: string;
    region: string;
    timezone: string;
    announced_delivery_date: string;
}

export interface OrderResponse {
  _id: string;
  courier: string;
  tracking_number: string;
  created: string;
  updated: string;
  checkpoints?: Partial<Checkpoint>[];
  delivery_info?: Partial<DeliveryInfo>;
  destination_country_iso3: string;
  zip_code: string;
}


export interface Props {
  orderNumber?: string;
  zipCode?: string;
  enabled?: boolean;
  retry?: boolean;
}

export interface FetchOrderParams {
  orderNumber: string;
  zipCode: string;
}
