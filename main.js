function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
    }
    // console.log(arr)
}
let btn  = document.querySelector('button')
let demo = document.querySelector('.demo')
let score = document.querySelector('.score')
let len = null
async function getData() {
    let res = await fetch("./2_mai.json")
    let data = await res.json();
    shuffle(data)
    len = data.length - 0
    let k = 0
    data.slice(0,len).forEach(item => {
        let div = document.createElement('div');
        div.id = "f" + k
        div.className = 'qbox'
        k++;
        let question = document.createElement('h3')
        question.innerHTML = `${k}/ ` + item['question'].slice(3)
        div.append(question)
        let inps = []
        Object.keys(item).forEach(key => {
            if (key.length == 1) {

                let inpd = document.createElement('div')
                let inp = document.createElement('input')
                inp.name = div.id
                inp.type = 'radio'
                inp.id = key+k
                if (key == item['answer']) {
                    inp.className = 'correct'
                }
                let la = document.createElement('label')

                la.innerHTML = item[key].slice(2)
                la.setAttribute('for' , key+k) 
                inpd.appendChild(inp)
                inpd.appendChild(la)

                inps.push(inpd)

            }
        })
        shuffle(inps)
        inps.forEach(inpx => {
            div.appendChild(inpx)
        })
        demo.appendChild(div)
    });
}
getData()




btn.onclick = function () {
    let n = len
    for (let i = 0; i < len; i++) {
        let tar = document.querySelectorAll(`#f${i} input`)
        document.querySelector(`#f${i}`).className = 'done'
        tar.forEach(t => {
            if (t.checked) {
                document.querySelector(`#f${i}`).className  = document.querySelector(`#f${i}`).className + " checked"

                if (t.className != 'correct') {
                    n--
                    document.querySelector(`#f${i}`).className  = document.querySelector(`#f${i}`).className + " err"
                } 
            } 
        })
    }
    let m = len - document.querySelectorAll('.checked').length 
    btn.style.display = 'none'
    score.innerHTML = `Score ${n-m} / ${len} !`
}