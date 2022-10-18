import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedInterface {
  Component?: React.ReactNode;
}

export const Protected: React.FC<ProtectedInterface> = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem('login');
    if (!login) {
      navigate('/login');
    }
  });

  return (
    <div>
      {Component}
    </div>
  );
}
