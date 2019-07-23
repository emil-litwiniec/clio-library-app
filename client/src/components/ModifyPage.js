import React from 'react';

import GenresControl from './controls/GenresControl';
import AuthorsControl from './controls/AuthorsControl';
import TranslatorsControl from './controls/TranslatorsControl';
import PublishersControl from './controls/PublishersControl';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

const ModifyPage = () => {
  return (
    <div>
      <Typography variant="overline">
        Modify categories:
      </Typography>
      <GenresControl />
      <Divider />
      <AuthorsControl />
      <Divider />

      <TranslatorsControl />
      <Divider />
      <PublishersControl />
      <Divider />
    </div>
  );
};

export default ModifyPage;
