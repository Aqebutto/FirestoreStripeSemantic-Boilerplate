import React, { Component } from 'react';
import {
  Grid,
  Card,
  Header,
  Message,
  Form,
  Button,
} from 'semantic-ui-react';

import Donate from '../Donate/index';
import SubDonate from '../SubDonate/index';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          <h1>Mery Outreach</h1>
          <p>
            Mercy Outreach’s model is to open community centres in
            areas of acute need. In the slums of Myanmar, every area
            is one of need, however, we look for places that also have
            potential. To raise the income of one family through a
            programme, would be wonderful, but if that family has
            problems, that schooling is still seen as a luxury,
            education as unnecessary and women’s rights as a low
            priority, then the community is still out of balance and
            transformation cannot take place.
          </p>
          <hr />
          <br />
          <Card>
            <Donate />
          </Card>
          <Card>
            <SubDonate />
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
