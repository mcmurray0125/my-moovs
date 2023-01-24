import React from 'react'
import{ Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
  
    return currentUser ? children : <Navigate to="/login" />;
  }
