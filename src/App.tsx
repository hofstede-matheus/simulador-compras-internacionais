import React, {useState} from 'react';
import './App.css';
import {plainToClass} from 'class-transformer';
import banksJson from './data/banks.json';
import {Bank} from "./model/Bank";
import {createStyles, Grid, makeStyles, MenuItem, Select, TextField, Theme, Typography} from "@material-ui/core";




function App() {
    const banks = plainToClass(Bank, banksJson);
    const [selectedBank, setSelectedBank] = useState(banks[0]);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            bankSelect: {
                fontSize: 24,
                borderColor: selectedBank.textColor,
                margin: 8,
                color: selectedBank.textColor,
            },
            bankSelectIcon: {
                color: selectedBank.textColor
            },
            input: {
                margin: 8,
                fontSize: 20,
                "& .MuiInputBase-root": {
                    color: selectedBank.textColor
                },
                "& .MuiInputLabel-root": {
                    color: selectedBank.textColor
                },
                "& .MuiInput-underline:before": {
                    borderBottom: `2px solid ${selectedBank.textColor}`
                },
                "& .MuiInput-underline:after": {
                    borderBottom: `2px solid ${selectedBank.textColor}`
                },
                "& .MuiInput-underline:hover:before": {
                    borderBottom: `2px solid ${selectedBank.textColor}`
                },
            },
            priceText: {
                margin: 24,
                fontSize: 32,
            }
        }),
    );
    const classes = useStyles();

    return (
        <div className="App">
            <header className="App-header">
                <Select
                    disableUnderline={true}
                    id="bank-select"
                    classes={{
                        root: classes.bankSelect,
                        icon: classes.bankSelectIcon,

                    }}
                    value={selectedBank.id}
                    onChange={
                        (event) =>
                            setSelectedBank(banks[event.target.value as number])
                    }
                >
                    {
                        banks.map((bank) => {
                            return (
                                <MenuItem value={bank.id}>{bank.name}</MenuItem>
                            )
                        })
                    }
                </Select>
                <TextField
                    className={classes.input}
                    id="value-dolar"
                    type="number"
                    label="Valor em dólar $" />
                <TextField
                    id="dolar-ptax"
                    className={classes.input}
                    type="number"
                    label="Dólar PTAX" />
                <TextField
                    id="iof"
                    className={classes.input}
                    type="number"
                    label="IOF (%)" />
                <TextField
                    id="spread"
                    className={classes.input}
                    type="number"
                    label="Spread (%)" />
                <Typography
                    className={classes.priceText}
                >
                    h1. Heading
                </Typography>

            </header>
        </div>
    );
}

export default App;
