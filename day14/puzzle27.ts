import * as fs from 'fs'

class InsertionPattern {
    Pattern: string
    Insert: string
    constructor(pattern: string,insert: string){
        this.Pattern = pattern
        this.Insert = insert
    }
}

const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day14/input.txt", 'utf8')
    .split("\n")
    .slice(0,-1)

let input = 
    data[0]
    .split("")


let patterns =
    data
    .slice(2)
    .map(str => {
        let arr = str.split(" -> ")
        return (
            new InsertionPattern(arr[0], arr[1])
        )
    })
const windowed = (input: string[]) => {
    return(
        input
        .map((_,index) => {
            return input.slice(index, index+2)
        })
    )
}
const insertInsertz = (input: string[][], patternz: InsertionPattern[]) => {
    let newSequence: string [] = []
    input
    .map(currentPair => {
        let contains =
            patternz.find(pattern => pattern.Pattern === (currentPair.join("")))
        if (contains) {
            newSequence.push(currentPair[0] + contains.Insert)
        } else {
            newSequence.push(currentPair[0])
        }
    })
    return newSequence
}

const lööpz = (input: string[], patternz: InsertionPattern[], steps: number) => {
    let currentInput = input
    for (let i=0; i < steps; i++) {
        console.log(i)
        let nextInput = 
            insertInsertz(windowed(currentInput),patternz)
            .join("")
            .split("")
        currentInput = nextInput
    }
    return currentInput
}

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem)
    if (!previous[group]) previous[group] = []
    previous[group].push(currentItem)
    return previous
  }, {} as Record<K, T[]>)

const countStringElements = (str: string[]) => {
    let grouped = groupBy(str,((item) => {return item}))
    let sorted =
        Object.values(grouped)
        .sort((a,b) => a.length-b.length)
    let min =
        sorted[0].length
    let max =
        sorted[sorted.length-1].length
    return (max-min)
}

console.log (countStringElements(lööpz(input,patterns,40)))