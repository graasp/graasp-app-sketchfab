import { Loader } from '@graasp/ui';

import { Grid } from '@mui/material';

import Result from './Result';

type Model = {
  uid: string;
  name: string;
  description: string;
  thumbnails: { images: { size: number; url: string; width: number }[] };
};

type Props = {
  models: Model[];
  isLoading: boolean;
  preview: (uid: string) => void;
  selectedModel: string;
};

const Results = ({ models, isLoading, preview, selectedModel }: Props) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid spacing={2} p={2} container>
      {models?.map(({ uid, name, description, thumbnails }) => {
        const imagesBySize = thumbnails.images.toSorted(
          (a, b) => a.size - b.size
        );
        const image = imagesBySize[imagesBySize.length - 1].url;
        return (
          <Grid item xs={4} sm={4} md={3} lg={2} key={uid}>
            <Result
              isSelected={selectedModel === uid}
              uid={uid}
              name={name}
              description={description}
              image={image}
              preview={preview}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Results;
