import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export default function NewField(props) {
    const classes = useStyles();

    const [field, setField] = useState({
        type: "",
        size: 1
      });
    
      function handleChange(event) {
        const { name, value } = event.target;
        //handleOptions(event)
        setField(prevField => {
          return {
            ...prevField,
            [name]: value
          };
        });

        console.log('value:', value);
      }

      function handleOptions(event) {
        //if (event.target.name === 'type') {
          switch (field.type) {
            case 'TINYINT':
              field.size = 1;
              break;
            case 'SMALLINT':
              field.size = 2;
              break;
            case 'MEDIUMINT':
              field.size = 3;
              break;
            case 'INT':
              field.size = 4;
              break;
            case 'BIGINT':
              field.size = 8;
              break;
            case 'FLOAT':
              field.size = 4;
              break;
            case 'DOUBLE':
              field.size = 8;
              break;
            case 'YEAR':
              field.size = 1;
              break;
            case 'DATE':
              field.size = 3;
              break;
            case 'TIME':
              field.size = 3;
              break;
            case 'DATETIME':
              field.size = 8;
              break;
            case 'TIMESTAMP':
              field.size = 4;
              break;
            case 'VARCHAR':
              if (field.size <= 255) {
                field.size = field.size + 1;
              }
              else {
                field.size = field.size + 2;
              }
              break;
            case 'TEXT':
              field.size = field.size + 2;
              break;
          }
     //   }
      }
    
      return (
        <div style={{display: 'inline'}}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                <Select
                name = 'type'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={field.type}
                onChange={handleChange}
                label="Tipo"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'TINYINT'}>TINYINT</MenuItem>
                <MenuItem value={'SMALLINT'}>SMALLINT</MenuItem>
                <MenuItem value={'MEDIUMINT'}>MEDIUMINT</MenuItem>
                <MenuItem value={'INT'}>INT</MenuItem>
                <MenuItem value={'BIGINT'}>BIGINT</MenuItem>
                <MenuItem value={'FLOAT'}>FLOAT</MenuItem>
                <MenuItem value={'DOUBLE'}>DOUBLE</MenuItem>
                <MenuItem value={'YEAR'}>YEAR</MenuItem>
                <MenuItem value={'DATE'}>DATE</MenuItem>
                <MenuItem value={'TIME'}>TIME</MenuItem>
                <MenuItem value={'DATETIME'}>DATETIME</MenuItem>
                <MenuItem value={'TIMESTAMP'}>TIMESTAMP</MenuItem>
                <MenuItem value={'CHAR'}>CHAR</MenuItem>
                <MenuItem value={'BINARY'}>BINARY</MenuItem>
                <MenuItem value={'VARCHAR'}>VARCHAR</MenuItem>
                <MenuItem value={'TEXT'}>TEXT</MenuItem>
                </Select>
            </FormControl>
            <TextField 
              className={classes.formControl} 
              name='size' 
              id="outlined-basic" 
              label="Tamaño" 
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined" 
              onChange={handleChange} 
              value={field.size}/>
            <Button className={classes.formControl} variant="contained" color="secondary" 
                onClick={(event) => {
                  field.size = parseInt(field.size);
                  handleOptions(event);
                  //field.size = parseInt(field.size);
                    props.onConfirm(props.id, field);
                    //console.log('onD', props.id)
                }}>
                👍
            </Button>
            <br></br>
        </div>
      );
}