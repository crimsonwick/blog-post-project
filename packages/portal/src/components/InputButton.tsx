import { Button } from '@mui/material';
import { InputButtonInterface } from '../interface/App';

export const InputButton = (props: InputButtonInterface) => {
  const customWidth = props.width;
  return (
    <Button
      type='submit'
      variant='contained'
      sx={{
        width: customWidth || '100%',
        fontFamily: ['Poppins', 'serif'].join(','),
        borderRadius: '25px',
        fontSize: '18px',
        marginTop: '25px',
        height: '56px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
      }}
      color='secondary'
    >
      {props.name}
    </Button>
  );
};
