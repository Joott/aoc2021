import * as fs from 'fs'

const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day13/input.txt", 'utf8')
    .split("\n")
    .slice(0,-1)
class Coordinate {
    X: number
    Y: number
    constructor(x: number, y: number) {
        this.X = x
        this.Y = y
    }
}
type FoldDirection =
    | "Horizontal"
    | "Vertical"
class FoldOperation {
    Direction: FoldDirection
    Value: number
    constructor(direction: FoldDirection, value: number) {
        this.Direction = direction
        this.Value = value
    }
}
const coordinates =
    data
    .filter(line => {
        return (!(line.startsWith("fold")) && !(line === ""))
    })
    .map (line => {
        let res = line.split(",").map(val => parseInt(val))
        return new Coordinate(res[0], res[1])
    })
const foldOperations =
    data
    .filter(line => {
        return ((line.startsWith("fold")) && !(line === ""))
    })
    .map (line => {
        let res =
            line
            .replace("fold along ","")
            .split("=")
        if (res[0] === "y") {
            return new FoldOperation("Horizontal",parseInt(res[1]))
        } else {
            return new FoldOperation("Vertical",parseInt(res[1]))
        }
    })
console.log(coordinates)
console.log(foldOperations)
const foldHorizontal = (input: Coordinate[], value:number) => {
    let result : Coordinate [] = []
    let valuesBelow =
        input.filter((coordinate) => {
            return (coordinate.Y > value) 
        })
    input.filter((coordinate) => {
        return (coordinate.Y <= value) 
    })
    .map(coordinate => result.push(coordinate))
    valuesBelow
    .map((coordinate) => {
        let distance = Math.abs(value - coordinate.Y)
        let newPosition = new Coordinate(coordinate.X, value - distance)
        let inResult = result.filter((c) => {return (c.X === newPosition.X && c.Y === newPosition.Y)})
        if (inResult.length === 0) {result.push(newPosition)}
    })
    return result
}
const foldVertical = (input: Coordinate[], value:number) => {
    let result : Coordinate [] = []
    let valuesBelow =
        input.filter((coordinate) => {
            return (coordinate.X > value) 
        })
    input.filter((coordinate) => {
        return (coordinate.X <= value) 
    })
    .map(coordinate => result.push(coordinate))
    valuesBelow
    .map((coordinate) => {
        let distance = Math.abs(value - coordinate.X)
        let newPosition = new Coordinate(value - distance, coordinate.Y)
        let inResult = result.filter((c) => {return (c.X === newPosition.X && c.Y === newPosition.Y)})
        if (inResult.length === 0) {result.push(newPosition)}
    })
    return result
}
console.log(foldVertical(coordinates,655).length)