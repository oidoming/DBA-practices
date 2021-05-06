import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NewField from './NewField'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1em',
  },
  textB: {
    marginBottom: '20px',
  }
}));

export default function SimpleSelect(props) {
    const classes = useStyles();

    const [result, setResult] = useState('');

    const [fields, setFields] = useState([]);

    const [table, setTable] = useState({
        headTuple: '',
        head: '',
        block: '',
        pctfree: '',
        tuples: ''
    });

    var atributes = [];

    function addField(field) {
        setFields(prevFields => {
          return [...prevFields, field];
        });
      }
    
      function ConfirmField(id, field) {
        console.log('id', id)
        atributes.push(field);
        /*setFields(prevFields => {
          return prevFields.filter((item, index) => {
            return index !== id;
          });
        });*/
      }

    function handleChange(event) {
      //event.target.value = parseInt(event.target.value)
      setTable({
          ...table,
          [event.target.name] : event.target.value
      });
    };

    function handleClick(event) {
        event.preventDefault();
    }

    function calculateSizing() {
      let sumF = sumAtributes(atributes, 'size'); // sum of table columns
      let rowSize = sumF + table.headTuple; // row size
      //console.log('rowS: ', rowSize)
      let spacePCTFree = table.block - (table.block * (table.pctfree / 100)); // Block - PCTFree
      //console.log('menos pctFree: ', spacePCTFree)
      let usefulSpace = (spacePCTFree * 1024) - table.head; // useful space of the block
      //console.log(usefulSpace)
      let rows = Math.floor(usefulSpace / rowSize) // rows we can store in a block
      //console.log(rows)
      let blocks = Math.ceil(table.tuples / rows) // necessary blocks
      //console.log(blocks)
      
      return blocks * table.block // sizing in kB
    }

    function sumAtributes(list, key) {
      return list.reduce((a, b) => a + (b[key] || 0), 0);
    }

    function parseValues() {
      table.headTuple = parseInt(table.headTuple)
      table.head = parseInt(table.head)
      table.block = parseInt(table.block)
      table.pctfree = parseInt(table.pctfree)
      table.tuples = parseInt(table.tuples)
    }

    var mapFields = fields.map((n, index) => {
        return (
          <NewField
            style={{display: 'inline'}}
            key={index}
            id={index}
            onConfirm={ConfirmField}
          />
        );
      })

  return (
    <div>
    <form className={classes.root} noValidate autoComplete="off" onClick={handleClick}>
        <Button className={classes.textB} variant="contained" color="primary"
            onClick={event => {
                addField(NewField);
                event.preventDefault();
            }}
        >
            Nuevo Campo
        </Button>
        <br></br>
      {mapFields}
      <br></br>
      <TextField 
        className={classes.textB} 
        name='headTuple' 
        id="outlined-basic" 
        label="Tamaño cabecera fila" 
        type="number"
        InputLabelProps={{
          shrink: true,
        }} 
        variant="outlined" 
        onChange={handleChange} 
        value={table.headTuple}/>
      <br></br>
      <TextField 
        className={classes.textB} 
        name='head' 
        id="outlined-basic" 
        label="Tamaño de la cabecera"
        type="number"
        InputLabelProps={{
          shrink: true,
        }} 
        variant="outlined" 
        onChange={handleChange} 
        value={table.head}/>
      <br></br>
      <TextField 
        className={classes.textB} 
        name='block' 
        id="outlined-basic" 
        label="Tamaño del bloque (k)" 
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined" 
        onChange={handleChange} 
        value={table.block}/>
      <br></br>
      <TextField 
        className={classes.textB} 
        name='pctfree' 
        id="outlined-basic" 
        label="PCTFree %" 
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined" 
        onChange={handleChange} 
        value={table.pctfree}/>
      <br></br>
      <TextField 
        className={classes.textB} 
        name='tuples' 
        id="outlined-basic" 
        label="Numero de registros" 
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined" 
        onChange={handleChange} 
        value={table.tuples}/>
      <br></br>
      <Button variant="contained" color="primary" type="submit"
      onClick={event => {
        parseValues()
        var sizing = calculateSizing();
        var s = (sizing).toLocaleString(
          undefined, 
          { minimumFractionDigits: 2 }
        );
        setResult('Resultado: ' + s + 'k');
    }}
      >Calcular</Button>
    </form>
    <br></br>
    <h2>{result}</h2>
    </div>
  );
}
