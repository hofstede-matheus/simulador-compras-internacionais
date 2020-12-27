import moment from "moment"
import {Moment} from "moment/moment";
const ehDiaUtil = require('@lfreneda/eh-dia-util')

export async function getDolarInLastWorkDay(): Promise<Response> {
    const lastWorkDay = moment(getLastWorkDay(moment())).format('MM-DD-YYYY')
    return await fetch(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao='${lastWorkDay}'`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
}

function getLastWorkDay(day: Moment): Moment {
    if(ehDiaUtil(day.format('YYYY-MM-DD'))) return day
    else getLastWorkDay(day.subtract(1, 'days'))
    return day
}