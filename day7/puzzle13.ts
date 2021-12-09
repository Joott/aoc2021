import * as fs from 'fs';
const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day7/input.txt", 'utf8')
    .replace("\n","")
    .split(",")
    .map(entry => parseInt (entry))
//part1
const median = (values:number[]) => {
    if(values.length === 0) throw new Error("No inputs")
    values.sort(function(a,b){
        return a-b;
    });
    var half = Math.floor(values.length / 2);
    if (values.length % 2)
        return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}
let optimalHorizontalPosition = median(data)
let consumedFuel =
    data
    .map((hp) => {
        return Math.abs(hp-optimalHorizontalPosition)
    })
    .reduce((a,b) => a + b)
console.log(consumedFuel)