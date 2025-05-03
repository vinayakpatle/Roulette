
export type COINS = 1 | 5 | 10 | 25 | 50 | 100 | 250 | 500;

export type outgoingMessage={
    type:"chat",
    amount:number,
    balance:number,
    locked:number
}