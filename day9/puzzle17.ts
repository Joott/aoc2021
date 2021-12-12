import * as fs from 'fs';
const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day9/input.txt", 'utf8')
    .split("\n")
    .slice(0,-1)
    .map((row) => {
        return (
            row
            .split("")
            .map((height) => {return parseInt(height)})
        )
    })
console.log(data)
class BasinFloor {
    R:number
    C:number
    H: number
    constructor(r: number,c: number, h:number) {
        this.R = r
        this.C = c
        this.H = h
    }
}
let lowPoints : BasinFloor[] = []
data
.map((row,rowIndex) => {
    row.map((height,colIndex) => {
        if (rowIndex === 0) {
            if (colIndex === 0) {
                if (data[rowIndex + 1][colIndex] > height && data[rowIndex][colIndex + 1] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            } else if (colIndex === row.length - 1) {
                if (data[rowIndex + 1][colIndex] > height && data[rowIndex][colIndex - 1] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            } else {
                if (data[rowIndex][colIndex - 1] > height && data[rowIndex][colIndex + 1] > height && data[rowIndex + 1][colIndex] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            }
        } else if (rowIndex === data.length - 1) {
            if (colIndex === 0) {
                if (data[rowIndex - 1][colIndex] > height && data[rowIndex][colIndex + 1] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            } else if (colIndex === row.length - 1) {
                if (data[rowIndex - 1][colIndex] > height && data[rowIndex][colIndex - 1] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            } else {
                if (data[rowIndex][colIndex - 1] > height && data[rowIndex][colIndex + 1] > height && data[rowIndex - 1][colIndex] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            }
        } else {
            if (colIndex === 0) {
                if (data[rowIndex - 1][colIndex] > height && data[rowIndex + 1][colIndex] > height && data[rowIndex][colIndex + 1] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            } else if (colIndex === row.length - 1) {
                if (data[rowIndex - 1][colIndex] > height && data[rowIndex + 1][colIndex] > height && data[rowIndex][colIndex - 1] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            } else {
                if (data[rowIndex - 1][colIndex] > height && data[rowIndex + 1][colIndex] > height && data[rowIndex][colIndex + 1] > height && data[rowIndex][colIndex - 1] > height) {lowPoints.push (new BasinFloor(rowIndex,colIndex,height))}
            }
        }
    })
})
const calcRiskFactor = (basinFloors: BasinFloor []) => {
    return(
        basinFloors
        .map(b => {return b.H + 1})
        .reduce((a,b) => a + b)
    )
}
console.log(calcRiskFactor(lowPoints))