import * as fs from 'fs'
import {Stack} from "stack-typescript"

const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day10/input.txt", 'utf8')
    .split("\n")
    .slice(0,-1)
    .map((row) => {
        return (
            row
            .split("")
        )
    })

const validateBrackets = (line: string[]) => {
    let openingBrackets = new Stack<string>()
    let acc: number[] = []
    line
    .map(bracket => {
        switch (bracket) {
            case '(': 
                openingBrackets.push('(')
                break
            case '[':
                openingBrackets.push('[')
                break
            case '{':
                openingBrackets.push('{')
                break
            case '<':
                openingBrackets.push('<')
                break
            case ')': {
                let opening = openingBrackets.pop()
                console.log(`${opening} vs )`)
                if (opening !== '(') {acc.push(3)}
                break
            }
            case ']':
                let opening = openingBrackets.pop()
                console.log(`${opening} vs ]`)
                if (opening !== '[') {acc.push(57)}
                break

            case '}': {
                let opening = openingBrackets.pop()
                console.log(`${opening} vs }`)
                if (opening !== '{') {acc.push(1197)}
                break
            }
            case '>': {
                let opening = openingBrackets.pop()
                console.log(`${opening} vs >`)
                if (opening !== '<') {acc.push(25137)}
                break
            }
            default: console.log("lol?")
        }
    })
    return acc
}
let res = 
    data
    .map(line => {
        return (
            (validateBrackets(line))[0]
        )
    })
    .filter(a => a != undefined)
    .reduce((a,b) => a+b)


console.log(res)