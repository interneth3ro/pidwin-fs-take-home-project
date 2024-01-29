import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import { styles } from './styles';

const Navbar = () => {
  const [user, setUser] = useState(
    localStorage.getItem('profile')
      ? jwtDecode(JSON.parse(localStorage.getItem('profile')).token)
      : 'null'
  );
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history('/auth');
    setUser('null');
  };

  useEffect(() => {
    if (user !== 'null' && user !== null) {
      if (user.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(
      localStorage.getItem('profile')
        ? jwtDecode(JSON.parse(localStorage.getItem('profile')).token)
        : 'null'
    );
  }, [location]);

  const AvatarContainer = styled.div`
    display: flex;
    & > * {
      margin: 4px;
    }
  `;

  const AvatarLabel = styled.div`
    dispay: flex;
    align-items: center;
  `;

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          CoinToss
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {user !== 'null' && user !== null ? (
          <div sx={styles.profile}>
            <AvatarContainer>
              <AvatarLabel>
                <Avatar sx={styles.purple} alt={user.name} src={user.picture}>
                  {user.name.charAt(0)}
                </Avatar>
              </AvatarLabel>
              <Typography sx={styles.userName} variant="h6">
                Tokens: {user.tokens}
              </Typography>
            </AvatarContainer>
            <Typography sx={styles.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              sx={styles.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history('/password');
              }}
            >
              Set Password
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
