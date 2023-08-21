import { Box, Paper, Typography } from "@mui/material";
import SignInForm from "./SignInForm";
import { blueGrey } from "@mui/material/colors";

export function Component() {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
      <Paper elevation={3} sx={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 360 }}>
        <Typography variant='h5' mb={4}>Track your order</Typography>
        <Typography variant='caption' color={blueGrey[300]} textAlign='center' width={300} mb={3}>Enter your order number and zip code combination to see the order details and shipping updates</Typography>
        <SignInForm />
      </Paper>
    </Box>
  )
}

Component.displayName = 'SignIn';
