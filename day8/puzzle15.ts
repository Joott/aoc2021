import * as fs from 'fs';
const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day8/input.txt", 'utf8')
    .split("\n")
    .slice(0,-1)
    .map(entry => {
        return(
            entry
            .split(" | ")[1]
            .split(" ")
        )
    })

let count =
    data
    .map (entry => {
        return(
            entry
            .filter(number =>{
                // 1; 4; 7; 8
                return number.length === 2 || number.length === 4 || number.length === 3 || number.length === 7
            }).length
        )
    })
    .reduce ((prev,current) => prev+current)

console.log(count)