import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import  Login  from './pages/login';
import LandingPage from './pages/landingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import MovieDetails from './pages/movieDetails';

const app = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default app
