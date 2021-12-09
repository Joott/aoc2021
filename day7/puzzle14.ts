import * as fs from 'fs';
const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day7/input.txt", 'utf8')
    .replace("\n","")
    .split(",")
    .map(entry => parseInt (entry))

const mean = (values:number[]) => {
    let sum =
        values
            .reduce((prev,current) => prev+current)
    return sum / values.length
}

let optimalHorizontalPosition = mean(data)

let consumedFuel =
    Math.min(
        data
        .map((hp) => {
            let distanceLower = Math.abs(hp-Math.floor(optimalHorizontalPosition))
            let fuelConsumptionLower = 0
            for (let i = 1; i <= distanceLower; i++) {
                fuelConsumptionLower = fuelConsumptionLower + i
            }
            return fuelConsumptionLower
        })
        .reduce((a,b) => a + b),
        data
        .map((hp) => {
            let distanceUpper = Math.abs(hp-Math.ceil(optimalHorizontalPosition))
            let fuelConsumptionUpper = 0
            for (let i = 1; i <= distanceUpper; i++) {
                fuelConsumptionUpper = fuelConsumptionUpper + i
            }
            return fuelConsumptionUpper
        })
        .reduce((a,b) => a + b)
    )
console.log(consumedFuel)