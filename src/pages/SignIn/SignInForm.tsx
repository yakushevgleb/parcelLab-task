import { Alert, Box, Button, CircularProgress, Divider, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useOrder from "../../api/useOrder";
import { ErrorMessages } from "@root/api/utils";

interface FormFields {
  orderNumber: string;
  zipCode: string;
}

const DEFAULT_REQUIRED_ERROR_TEXT = 'This field is required';
const NOT_FOUND_FIELD_ERROR = 'not-found';

export default function SignInForm() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit, getValues, watch, setError } = useForm({
    defaultValues: {
      orderNumber: '',
      zipCode: ''
    }
  })
  watch(['orderNumber', 'zipCode'])

  const { refetch, isLoading } = useOrder({
    orderNumber: getValues('orderNumber'),
    zipCode: getValues('zipCode'),
    enabled: false,
    retry: false
  })

  const requiredErrorOrderNumberText = formState.errors.orderNumber?.type === 'required' && DEFAULT_REQUIRED_ERROR_TEXT;
  const requiredErrorZipCodeText = formState.errors.zipCode?.type === 'required' && DEFAULT_REQUIRED_ERROR_TEXT;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await refetch?.()
    if (result?.error instanceof Error && result?.error.message === ErrorMessages.NOT_FOUND) {
      setError('zipCode', { type: NOT_FOUND_FIELD_ERROR });
      setError('orderNumber', { type: NOT_FOUND_FIELD_ERROR });
      return;
    }
    if (result?.isError) {
      navigate('/error')
    }
    navigate(`/order/${data.orderNumber}?zipCode=${data.zipCode}`);
  }

  const isNotFoundError = formState.errors.zipCode?.type === NOT_FOUND_FIELD_ERROR || formState.errors.orderNumber?.type === NOT_FOUND_FIELD_ERROR;

  return (
    <Box component='form' display='flex' flexDirection='column' gap={3} width='100%' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='orderNumber'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            label='Order number'
            error={!!formState.errors.orderNumber}
            helperText={requiredErrorOrderNumberText}
            required
            fullWidth
            {...field}
          />
        )}
      />
      <Controller
        name='zipCode'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            label='Zip code'
            error={!!formState.errors.zipCode}
            helperText={requiredErrorZipCodeText}
            required
            fullWidth
            {...field}
          />
        )}
      />
      <Divider />
      {isNotFoundError && (
        <Alert severity='error'>No order was found. Please check fields and try again</Alert>
      )}
      <Button type='submit' variant='contained' disabled={isLoading} startIcon={isLoading ? <CircularProgress /> : undefined}>Track</Button>
    </Box>
  )
}
