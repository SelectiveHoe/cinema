import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React from 'react';
import TextField from '../../../component/TextFiled';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AppState } from '../../../store';
import { Field, Form } from 'react-final-form';
import CheckBoxField from '../../../component/CheckBoxField';
import FFSelectField from '../../../component/SelectField';
import HorizontalListItem from '../../../component/HorizontalListItem';
import FFAutocompleteField from '../../../component/AutocompleteField';

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
  films: state.movie.movie.allFilms,
});

const mapDispatchToProps = {
  
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Catalog: React.FC<Props> = ({ films }) => {
  const classes = useStyles();
  const arr = new Array(50);

  const submit = (val: any) => {
    console.log(val);
  }

  const validate = (values: Record<string, any>) => {
    console.log('test');
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
                items={[{id: 3, name: 'test1'}, {id: 2, name: 'test2'}]}
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
                items={[{id: 3, name: 'test1'}, {id: 2, name: 'test2'}]}
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
                  label: 'Year from',
                  variant: 'outlined',
                  size: 'small',
                }}/>
              <Field
                name="year_to"
                component={FFSelectField}
                items={[{value: 1, label: 'test'}, {value: 2, label: 'test'}]}
                InnerInputProps={{
                  className: classes.input,
                  fullWidth: true,
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
                  label: 'from ... to 40 minutes (Short)',
                }}/>
              <Field
                name="isMiddle"
                component={CheckBoxField}
                InnerInputProps={{
                  label: 'from 40 to 150 minutes (Normal)',
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
        {arr.fill(films[0], 0, 50).map(item => <HorizontalListItem movie={item} key={item.id}/>)}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
