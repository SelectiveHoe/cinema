import { Accordion, AccordionSummary, Button, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import TextField from '../../../component/TextFiled';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AppState } from '../../../store';
import { Field, Form } from 'react-final-form';
import CheckBoxField from '../../../component/CheckBoxField';
import FFSelectField from '../../../component/SelectField';
import HorizontalListItem from '../../../component/HorizontalListItem';
import FFAutocompleteField from '../../../component/AutocompleteField';
import { searchMovieRequest } from '../../../store/movie/actions';
import { Country, Genre } from '../../../common/types/movie';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  searchContainer: {
  },
  title: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.primary.main
  },
  containerOptions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    width: '1000px',
    padding: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
    flexWrap: 'nowrap',
  },
  form: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  FilmSelector: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}));

const mapStateToProps = (state: AppState) => ({
  films: state.movie.movie.foundFilms,
  genres: state.movie.movie.allGenre,
  country: state.movie.movie.allCountry,
});

const mapDispatchToProps = {
  searchMovieRequest,
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Catalog: React.FC<Props> = ({ films, searchMovieRequest, genres, country }) => {
  const classes = useStyles();

  useEffect(() => {
    searchMovieRequest({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (val: any) => {
    if (val.country && Array.isArray(val.country)) val.country = val.country.map((item: Country) => item.id).toString();
    if (val.genres && Array.isArray(val.genres)) val.genres = val.genres.map((item: Genre) => item.id).toString();
    searchMovieRequest(val);
  }

  const validate = (values: Record<string, any>) => {
    return {};
  }

  return (
    <div className={classes.root}>
      <div className={classes.containerOptions}>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
          <Typography className={classes.title}>Filters</Typography>
        </AccordionSummary>
        <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, submitting, form }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <div>
              <Field
                name="country"
                component={FFAutocompleteField}
                items={country}
                InnerInputProps={{
                  className: classes.input,
                  label: 'Country',
                  variant: 'outlined',
                  size: 'small',
                }}/>
            </div>
            <div>
              <Field
                name="genres"
                component={FFAutocompleteField}
                items={genres}
                InnerInputProps={{
                  className: classes.input,
                  label: 'Genre',
                  variant: 'outlined',
                  size: 'small',
                }}/>
            </div>
            <div style={{ display: 'flex' }}>
              <Field
                name="year_from"
                component={TextField}
                InnerInputProps={{
                  className: classes.input,
                  fullWidth: true,
                  type: 'number',
                  label: 'Year from',
                  variant: 'outlined',
                  size: 'small',
                }}/>
              <Field
                name="year_to"
                component={TextField}
                items={[{value: 1, label: 'test'}, {value: 2, label: 'test'}]}
                InnerInputProps={{
                  className: classes.input,
                  fullWidth: true,
                  type: 'number',
                  label: 'Year to',
                  variant: 'outlined',
                  size: 'small',
                }}/>
              </div>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Field
                name="isShort"
                component={CheckBoxField}
                InnerInputProps={{
                  label: 'from ... to 60 minutes (Short)',
                }}/>
              <Field
                name="isMiddle"
                component={CheckBoxField}
                InnerInputProps={{
                  label: 'from 60 to 150 minutes (Normal)',
                }}/>
              <Field
                name="isLong"
                component={CheckBoxField}
                InnerInputProps={{
                  label: 'from 150 to ... minutes (Long)',
                }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: '8px' }} variant="text" color="primary" onClick={form.reset}>clear</Button>
              <Button variant="outlined" color="primary" type='submit'>Find</Button>
            </div>
          </form>
        )}/>
        </Accordion>
      </div>
      <div className={classes.FilmSelector}>
        {films.map(item => <HorizontalListItem movie={item} key={item.id}/>)}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
