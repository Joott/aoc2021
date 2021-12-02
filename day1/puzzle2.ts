import * as fs from 'fs';

const data =
    fs.readFileSync('C:/Users/jonat/source/repos/aoc2021/day1/input.txt', 'utf8')
        .split("\n")
        .map (x => parseInt(x))

let windowSum =
    data
        .map((_,index) => {
            return data.slice(index, index+3)
        })
        .filter(x => x.length === 3)
        .map(x => {
            return x.reduce((a,b) => a + b)
        })

let count = 0

let res =
    windowSum.map((val,index) => {
        if (index > 0) {
            if (val > windowSum[index - 1]) {
                count ++
            }
        }
    })

console.log(count)