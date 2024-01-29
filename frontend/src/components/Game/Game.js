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
import Input from '../Login/Input';
import { jwtDecode } from 'jwt-decode';
import { styles } from './styles';
import { Form } from 'react-router-dom';

const Game = () => {
  const [wager, setWager] = useState(0);
  const [choice, setChoice] = useState('heads');
  const user = localStorage.getItem('profile')
    ? jwtDecode(JSON.parse(localStorage.getItem('profile')).token)
    : 'null';

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleWagerChange = (e) => {
    setWager(e.target.value);
  };

  const handleChoiceChange = (e) => {
    setChoice(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 500 }}>
      <Card variant="outlined">
        <CardContent>
          <form sx={styles.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm="6">
                <TextField
                  name="wager"
                  label="Wager"
                  required
                  type="number"
                  min="1"
                  handleChange={handleWagerChange}
                  autoFocus
                  variant="outlined"
                />
              </Grid>
              <Grid item sm="6">
                <RadioGroup
                  row
                  defaultValue="heads"
                  name="radio-buttons-group"
                  handleChange={handleChoiceChange}
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
