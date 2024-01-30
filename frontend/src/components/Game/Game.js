import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { coinToss } from '../../actions/game';

const initialFormData = {
  wager: 0,
  choice: '',
};

const Game = () => {
  const [formData, setFormData] = useState(initialFormData);
  const user = localStorage.getItem('profile')
    ? jwtDecode(JSON.parse(localStorage.getItem('profile')).token)
    : 'null';

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId: user._id,
      wager: formData.wager,
      choice: formData.choice,
    };

    dispatch(coinToss(payload));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ minWidth: 500 }}>
      <Card variant="outlined">
        <CardContent>
          <form sx={styles.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  name="wager"
                  label="Wager"
                  required
                  type="number"
                  min="1"
                  onChange={handleChange}
                  autoFocus
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={6}>
                <RadioGroup
                  row
                  defaultValue="heads"
                  name="choice"
                  onChange={handleChange}
                  sx={styles.radioGroup}
                >
                  <FormControlLabel
                    value="heads"
                    control={<Radio />}
                    label="Heads"
                  />
                  <FormControlLabel
                    value="tails"
                    control={<Radio />}
                    label="Tails"
                  />
                </RadioGroup>
              </Grid>
              <Button
                type="submit"
                sx={styles.submit}
                fullWidth
                variant="contained"
                color="primary"
              >
                Toss The Coin!
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Game;
