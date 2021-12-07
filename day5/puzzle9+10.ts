import * as fs from 'fs';

class Coordinate {
    X:number
    Y:number
    constructor(x: number,y: number) {
        this.X = x
        this.Y = y
    }
}
class VentLine {
    C1: Coordinate
    C2: Coordinate
    constructor(c1: Coordinate, c2: Coordinate) {
        this.C1 = c1
        this.C2 = c2
    }
}
const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day5/input.txt", 'utf8')
        .split("\n")
        .slice(0,-1)
        .map((line)=>{
            let res = line.split(/\W+/)
            return new VentLine(
                new Coordinate(parseInt(res[0]), parseInt(res[1])),
                new Coordinate(parseInt(res[2]), parseInt(res[3]))
            )
        })

const ccw = (A:Coordinate, B:Coordinate, C:Coordinate) => {
    return (C.Y-A.Y) * (B.X-A.X) > (B.Y-A.Y) * (C.X-A.X)
}
const intersect = (vl1: VentLine, vl2: VentLine) => {
    let A = vl1.C1
    let B = vl1.C2
    let C = vl2.C1
    let D = vl2.C2
    return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D)
}

const getLineFormula = (vl:VentLine) => {
    let m = (vl.C2.Y - vl.C1.Y)/(vl.C2.X - vl.C1.X)
    let b = ((m * vl.C1.X) - vl.C1.Y) * -1
    return ((x:number) => {return (m * x) + b})
}

let getPoints = (vl:VentLine) => {
    let points: Coordinate[] = []
    if (vl.C1.X === vl.C2.X) {
        let min = Math.min(vl.C1.Y, vl.C2.Y)
        let max = Math.max(vl.C1.Y, vl.C2.Y)
        for (let i = min; i <= max; i++) {
            points.push(new Coordinate(vl.C1.X, i))
        }
    } else {
        let func = getLineFormula(vl)
        let min = Math.min(vl.C1.X, vl.C2.X)
        let max = Math.max(vl.C1.X, vl.C2.X)
        for (let i = min; i <= max; i++) {
            points.push(new Coordinate(i, func(i)))
        }
    }
    return points
}
const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

let resNoDiag = groupBy(
    (data
        .filter((vl) => {
            return ((vl.C1.X === vl.C2.X) || (vl.C1.Y === vl.C2.Y))
        })
        .map(getPoints).
        flat()
    ),((c) => {return `${c.X},${c.Y}`}))

let resDiag = groupBy(
    (data
        .map(getPoints).
        flat()
    ),((c) => {return `${c.X},${c.Y}`}))
    
console.log(
    Object.values(resNoDiag)
    .filter((v) => v.length > 1)
    .length
)
console.log(
    Object.values(resDiag)
    .filter((v) => v.length > 1)
    .length
)
