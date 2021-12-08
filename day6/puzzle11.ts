import * as fs from 'fs';

const data =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day6/input.txt", 'utf8')
        .replace("\n","")
        .split(",")
        .map(entry => parseInt (entry))

const testData =
    fs.readFileSync("C:/Users/jonat/source/repos/aoc2021/day6/testInput.txt", 'utf8')
        .replace("\n","")
        .split(",")
        .map(entry => parseInt (entry))

let fishies: number[] = []

for (let i = 0; i < 80; i++){
    console.log(`After ${i+1} days: ${fishies.length}`)
    let currentFishies: number[]
    if (i === 0){
        currentFishies = data
    } else{
        currentFishies = fishies
    }
    fishies = []
    currentFishies
    .map(fish => {
        if (fish > 0) {
            fishies.push(fish-1)
        } else {
            fishies.push(6,8)
        }
    })
}

console.log(fishies)
console.log(fishies.length)