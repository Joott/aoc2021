import * as fs from 'fs';

const data =
    fs.readFileSync('C:/Users/jonat/source/repos/aoc2021/day3/input.txt', 'utf8')
    .split("\n")
    .slice(0,-1)
    .map(line => line.split(""))

const getMostCommonBitAt = (bits: string[][], index:number, tiebreaker:string) => {
    let transposed = bits[0].map((_, colIndex) => bits.map(row => row[colIndex]))
    //console.log(transposed[index])
    let ones = transposed[index].filter((val)=>val==='1')
    //console.log(ones.length)
    if (ones.length === (bits.length/2)) {
        return tiebreaker
    } else if (ones.length < (bits.length/2)) {
        return '0'
    } else {
        return '1'
    }
}
const flip = (bitString:string) => {
    if (bitString === '1') {
        return '0'
    } else {
        return '1'
    }
}

const findRating = (data:string[][],index:number,tieBreaker:string,takeLarger:boolean) => {
    let tmp: string[] = []
    const findRatingLoop = (data:string[][],index:number,tieBreaker:string,takeLarger:boolean) => {
        //console.log(data)
            if (data.length != 1) {
                let commonBit:string
                if (takeLarger) {
                    commonBit = getMostCommonBitAt(data,index,tieBreaker)
                    //console.log(commonBit)
                } else {
                    commonBit = flip(getMostCommonBitAt(data,index,tieBreaker))
                    //console.log(commonBit)
                }
                let filtered = data.filter(vals => vals[index] === commonBit)
                findRatingLoop(filtered,(index+1),tieBreaker,takeLarger)
            }
            else {tmp = data[0]}
    }
    findRatingLoop(data,index,tieBreaker,takeLarger)
    return tmp
}

const oxygenGeneratorRating = parseInt((findRating(data,0,'1',true)).join(""),2)

const co2ScrubberRating = parseInt((findRating(data,0,'1',false)).join(""),2)

console.log(`oxygenGeneratorRating: ${oxygenGeneratorRating}; co2GeneratorRating:${co2ScrubberRating}; Hash: ${co2ScrubberRating*oxygenGeneratorRating}`)