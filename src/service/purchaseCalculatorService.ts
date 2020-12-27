export function calculatePurchase(
    purchaseValueInDolar: number,
    dolarPTAX: number,
    spreadPercentage: number,
    iofPercentage: number)
    : string
{
    return (purchaseValueInDolar *
        (dolarPTAX * (1 + spreadPercentage / 100)) *
        (1 + iofPercentage /100)).toFixed(2)
}