import React from 'react';
import './App.css';
import { plainToClass } from 'class-transformer';
import banksJson from './data/banks.json';
import {Bank} from "./model/Bank";

function App() {
    const banks = plainToClass(Bank, banksJson);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
