import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Form, List } from '../components/publisher';

const Publishers = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route path="/publishers/new">
          <Form />
        </Route>

        <Route path="/publishers">
          <List />
        </Route>
      </Switch>
    </>
  );
};

export default Publishers;
