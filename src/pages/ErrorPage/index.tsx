import { Box, Link, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import errorImgUrl from '@root/assets/error_page.jpeg';

export default function ErrorPage() {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
      <Paper elevation={3} sx={{ display: 'flex', width: 600, height: 350, overflow: 'hidden' }}>
        <Box component='img' src={errorImgUrl} alt='error image' sx={{ objectFit: 'cover' }} width='50%' />
        <Box p={(theme) => theme.spacing(4, 3)} width='50%'>
          <Typography variant='h5' mb={1}>Oh no!</Typography>
          <Typography variant='body1'>This is an error page! Normally you shouldn't see it but here you're...</Typography>
          <Typography variant='body1'>But no worries, let us quickly guide you back:</Typography>
          <Box role='list' mt={2}>
            <Box role='listitem'><Link component={RouterLink} to='/'>Search order</Link></Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
