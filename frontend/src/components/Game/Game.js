import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormHelperText,
  CardHeader,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { coinToss } from '../../api/index';
import { COINTOSS } from '../../constants/actionTypes';

const initialFormData = {
  wager: 0,
  choice: '',
};

const Game = () => {
  const gameState = useSelector((state) => state?.game?.gameState);
  const [formData, setFormData] = useState(initialFormData);
  const [coinTossed, setCoinTossed] = useState(false);
  const [tossResult, setTossResult] = useState(null);
  const [wagerError, setWagerError] = useState(false);
  const [wagerErrorText, setWagerErrorText] = useState('');
  const [tossResults, setTossResults] = useState([]);
  const user = localStorage.getItem('profile')
    ? jwtDecode(JSON.parse(localStorage.getItem('profile')).token)
    : 'null';

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setWagerError(false);
    if (formData.wager > gameState.currentBalance) {
      setWagerError(true);
      setWagerErrorText('You cannot wager more than you have!');
    } else {
      setWagerError(false);
      setWagerErrorText('');
      tossCoin();
    }
  };

  const tossCoin = async () => {
    const choice = formData.choice === '' ? 'heads' : formData.choice;
    const payload = {
      userId: user._id,
      wager: formData.wager,
      choice,
      currentStreak: gameState?.currentStreak,
    };

    const { data } = await coinToss(payload);
    setCoinTossed(true);
    setTossResult(data.result);
    const { currentStreak, currentBalance, flipResult } = data.result;
    const results = [...tossResults];
    results.unshift({ choice, flipResult });
    if (results.length > 10) {
      results.pop();
    }
    setTossResults(results);

    dispatch({
      type: COINTOSS,
      data: {
        currentStreak,
        currentBalance,
      },
    });
    console.log(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ minWidth: 500 }}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={6}>
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
                      error={wagerError}
                    />
                    <FormHelperText error={wagerError}>
                      {wagerErrorText}
                    </FormHelperText>
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
              {coinTossed && (
                <Paper sx={styles.resultContainer} elevation={3}>
                  {tossResult.isWin ? (
                    <Typography variant="h4" align="center" color="secondary">
                      You won!
                    </Typography>
                  ) : (
                    <Typography variant="h4" align="center" color="primary">
                      You lost
                    </Typography>
                  )}
                </Paper>
              )}
            </Grid>
            <Grid item sm={6}>
              <Card variant="outlined">
                <CardHeader title="Last 10 Rolls:" />
                <CardContent>
                  {tossResults.map((flip) => (
                    <>
                      <Typography variant="h6">
                        You chose: {flip.choice}
                        <br />
                        Result: {flip.flipResult}
                      </Typography>
                      <hr />
                    </>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Game;
