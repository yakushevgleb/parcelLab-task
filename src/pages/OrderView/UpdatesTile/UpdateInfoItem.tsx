import { Box, Typography, colors } from "@mui/material";
import { Checkpoint } from "@root/api/useOrder/types";
import format from "date-fns/format";

interface Props {
  data: Partial<Checkpoint>;
}
export default function UpdateInfoItem(props: Props) {
  const { data } = props;
  const parsedDate = data.event_timestamp ? new Date(Date.parse(data.event_timestamp)) : null;
  const dateTime = parsedDate && format(parsedDate, 'dd.MM.yyyy, HH:MM');
  return (
    <Box display='flex' flexDirection='column' gap={1} role='listitem'>
      <Typography variant='subtitle2'>{data.status}</Typography>
      <Typography variant='body2'>{data.status_details}</Typography>
      <Box display='flex' justifyContent='space-between' color={colors.blueGrey['300']}>
        <Typography variant='caption'>{data.city}</Typography>
        <Typography variant='caption'>{dateTime}</Typography>
      </Box>
    </Box>
  )
}
