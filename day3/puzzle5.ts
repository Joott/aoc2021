import * as fs from 'fs';

const data =
    fs.readFileSync('C:/Users/jonat/source/repos/aoc2021/day3/input.txt', 'utf8')
    .split("\n")
    .slice(0,-1)
    .map(line => line.split(""))

let transposed = data[0].map((_, colIndex) => data.map(row => row[colIndex]))

let binary =
    transposed
        .map((set) => {
            let length1 = set.filter(element => element === '1').length
            if ((set.length/2) > length1) {
                return '0'
            } 
            else {
                return '1'
            }
        })

let binaryFlipped =
    binary
    .map(element => {
        if (element === '1') {
            return '0'
        }
        else {
            return '1'
        }
    })

let gammaRate = parseInt(binary.join(""),2)
let epsilonRate = parseInt(binaryFlipped.join(""),2)
    

console.log(`${gammaRate}, ${epsilonRate}, ${gammaRate*epsilonRate}`)