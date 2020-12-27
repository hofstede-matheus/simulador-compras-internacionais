import React, {useEffect, useState} from 'react';
import './App.css';
import {plainToClass} from 'class-transformer';
import banksJson from './data/banks.json';
import {Bank} from "./model/Bank";
import {createStyles, Grid, Link, makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {getDolarInLastWorkDay} from "./service/dolarService"
import {calculatePurchase} from "./service/purchaseCalculatorService"
import {IOF} from "./data/constants";

function App() {
    const banks = plainToClass(Bank, banksJson);
    const [selectedBank, setSelectedBank] = useState(banks[0]);
    const [purchaseValueInDolar, setPurchaseValueInDolar] = useState(0)
    const [purchaseValueInReais, setPurchaseValueInReais] = useState("")
    const [dolarPTAX, setDolarPTAX] = useState(0)

    useEffect(() => {
        getDolarValue()
    }, []);

    useEffect(() => {
        setPurchaseValueInReais(calculatePurchase(
            purchaseValueInDolar,
            dolarPTAX,
            selectedBank.spreadPercentage,
            IOF
        ))
    }, [selectedBank, purchaseValueInDolar, dolarPTAX]);

    async function getDolarValue() {
        await getDolarInLastWorkDay()
            .then(response => response.json())
            .then(data => {
                console.log(data.value[0].cotacaoVenda)
                setDolarPTAX(data.value[0].cotacaoVenda)
            });
    }

    const useStyles = makeStyles(() =>
        createStyles({
            main: {
                backgroundColor: selectedBank.backgroundColor,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            },
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
            spreadLinkText: {
                fontSize: 14,
                color: selectedBank.textColor
            },
            priceText: {
                margin: 24,
                fontSize: 48,
                color: selectedBank.textColor
            }
        }),
    );
    const classes = useStyles();

    return (
        <div className="App">
            <div className={classes.main}>
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
                    onChange={(event) => {
                        if (parseFloat(event.target.value) >= 0)
                        setPurchaseValueInDolar(parseFloat(event.target.value) || 0)
                    }}
                    value={purchaseValueInDolar}
                    label="Valor em dólar $" />
                <TextField
                    id="dolar-ptax"
                    value={dolarPTAX}
                    className={classes.input}
                    type="number"
                    onChange={(event) => {
                        if (parseFloat(event.target.value) >= 0)
                        setDolarPTAX(parseFloat(event.target.value) || 0)
                    }}
                    label="Dólar PTAX" />
                <TextField
                    id="iof"
                    className={classes.input}
                    type="number"
                    value={IOF}
                    label="IOF (%)" />
                <TextField
                    id="spread"
                    className={classes.input}
                    type="number"
                    value={selectedBank.spreadPercentage}
                    label="Spread (%)" />
                <Typography>
                    <Link
                        className={classes.spreadLinkText}
                        target="_blank"
                        href={selectedBank.spreadLink}
                    >
                        * Informações oficiais de spread
                    </Link>
                </Typography>
                <Typography
                    className={classes.priceText}
                >
                    {purchaseValueInReais}
                </Typography>

            </div>
        </div>
    );
}

export default App;
