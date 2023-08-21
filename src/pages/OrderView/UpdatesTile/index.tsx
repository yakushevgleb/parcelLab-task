import { useContext } from "react"
import { OrderDataContext } from "@root/context/OrderDataProvider"
import Paper from "@mui/material/Paper";
import { Box, LinearProgress, Typography, colors } from "@mui/material";
import UpdateInfoItem from "./UpdateInfoItem";
import { CheckpointStatus } from "@root/api/useOrder/types";

const statusToProgressValue = (status?: CheckpointStatus): number => {
  switch (status) {
    case CheckpointStatus.ReadyForCollection:
    case CheckpointStatus.FailedDeliveryAttempt:
      return 75;
    case CheckpointStatus.NewDeliveryDateSet:
    case CheckpointStatus.InTransit:
      return 50;
    case CheckpointStatus.Registered:
    default:
      return 25;
  }
}
export default function UpdatesTile() {
  const { data } = useContext(OrderDataContext);
  const lastStatus = data?.checkpoints?.[0].status;

  const progressValue = statusToProgressValue(lastStatus);
  if (!data) {
    return null;
  }
  return (
    <Paper elevation={3} sx={{ width: 350, height: 500, display: 'flex', flexDirection: 'column' }}>
      <Box pl={3} pr={3} pt={4}>
        <Typography variant='h5' mb={2}>Shipping updates</Typography>
        <LinearProgress value={progressValue} variant="determinate" />
        <Box display='flex' justifyContent='space-between' color={colors.blueGrey[200]} mt={1} mb={3}>
          <Typography variant='caption'>Processed</Typography>
          <Typography variant='caption'>Delivered</Typography>
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' gap={3} role='list' overflow='auto' pr={3} pl={3}>
        {data?.checkpoints?.map((checkpoint) => (
          <UpdateInfoItem data={checkpoint} key={checkpoint.event_timestamp} />
        ))}
      </Box>
    </Paper>
  )
}
