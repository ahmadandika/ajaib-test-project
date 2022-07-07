import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from 'containers/Home';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
