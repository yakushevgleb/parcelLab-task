import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { OrderDataContext } from "@root/context/OrderDataProvider";
import { format, parse } from "date-fns";
import { CheckpointStatus } from "@root/api/useOrder/types";

export default function StatusTile() {
  const { data } = useContext(OrderDataContext);
  const lastCheckpoint = data?.checkpoints?.[0];
  const lastStatus = lastCheckpoint?.status;
  const lastStatusDetails = lastCheckpoint?.status_details;
  const checkPointMeta = lastCheckpoint?.meta;
  const pickupLocationImg = checkPointMeta?.pickup_address_map_url;
  const pickupMapUrl = checkPointMeta?.pickup_address_link;
  const announcedDeliveryDate = data?.delivery_info?.announced_delivery_date;
  const formatedAnnouncedDeliveryDate = announcedDeliveryDate && format(parse(announcedDeliveryDate, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy');
  const isAnnouncmentShown = lastStatus !== CheckpointStatus.ReadyForCollection && lastStatus !== CheckpointStatus.FailedDeliveryAttempt && lastStatus !== CheckpointStatus.NewDeliveryDateSet;
  const deliveryDate = checkPointMeta?.delivery_date;
  const formatedDeliveryDate = deliveryDate && format(parse(deliveryDate, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy');

  if (!data) {
    return null;
  }
  return (
    <Paper elevation={3} sx={{ width: 350, height: 500, paddingTop: 3, display: 'flex', flexDirection: 'column' }}>
      <Box pr={3} pl={3}>
        <Typography variant='h4' mb={3}>{lastStatus}</Typography>
        <Typography variant='h5' mb={isAnnouncmentShown ? 0.5 : 3}>{lastStatusDetails}</Typography>
        {announcedDeliveryDate && isAnnouncmentShown && (
          <Typography variant='caption' mb={3}>Approximate delivery date is {formatedAnnouncedDeliveryDate}</Typography>  
        )}
        {formatedDeliveryDate && (
          <Typography variant='body1' mb={3}>
            Delivery is set to <strong>{formatedDeliveryDate}</strong> between <strong>{checkPointMeta.delivery_time_frame_from}</strong> and <strong>{checkPointMeta.delivery_time_frame_to}</strong>
          </Typography>  
        )}
      </Box>
      {pickupLocationImg && (
        <Box component='img' alt='pickup location image' src={pickupLocationImg} flexGrow={1} width='100%' sx={{ objectFit: 'cover' }} />
      )}
      {pickupMapUrl && (
        <Button variant='contained' href={pickupMapUrl} target='_blank' fullWidth>Get directions</Button>
      )}
    </Paper>
  )
}
