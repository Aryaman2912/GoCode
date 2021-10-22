let str = "A subarray of array $$$a$$$ from index $$$l$$$ to the index $$$r$$$ is the array $$$[a_l, a_{l+1}, \dots, a_{r}]$$$. The number of occurrences of the array $$$b$$$ in the array $$$a$$$ is the number of subarrays of $$$a$$$ such that they are equal to $$$b$$$.You are given $$$n$$$ arrays $$$A_1, A_2, \dots, A_n$$$; the elements of these arrays are integers from $$$1$$$ to $$$k$$$. You have to build an array $$$a$$$ consisting of $$$m$$$ integers from $$$1$$$ to $$$k$$$ in such a way that, for every given subarray $$$A_i$$$, the number of occurrences of $$$A_i$$$ in the array $$$a$$$ is not less than the number of occurrences of each non-empty subarray of $$$A_i$$$ in $$$a$$$. Note that if $$$A_i$$$ doesn't occur in $$$a$$$, and no subarray of $$$A_i$$$ occurs in $$$a$$$, this condition is still met for $$$A_i$$$.Your task is to calculate the number of different arrays $$$a$$$ you can build, and print it modulo $$$998244353$$$.The first line contains three integers $$$n$$$, $$$m$$$ and $$$k$$$ ($$$1 \le n, m, k \le 3 \cdot 10^5$$$) — the number of the given arrays, the desired length of the array $$$a$$$, and the upper bound on the values in the arrays.Then $$$n$$$ lines follow. The $$$i$$$-th line represents the array $$$A_i$$$. The first integer in the $$$i$$$-th line is $$$c_i$$$ ($$$1 \le c_i \le m$$$) — the number of elements in $$$A_i$$$; then, $$$c_i$$$ integers from $$$1$$$ to $$$k$$$ follow — the elements of the array $$$A_i$$$.Additional constraint on the input: $$$\sum\limits_{i=1}^n c_i \le 3 \cdot 10^5$$$; i. e., the number of elements in the given arrays in total does not exceed $$$3 \cdot 10^5$$$.Print one integer — the number of different arrays $$$a$$$ you can build, taken modulo $$$998244353$$$."


// let strarr = str.split('$$$')
// let ans = '';
// for(let i = 0; i < strarr.length; i++) {
//     if(i%2 == 0) {
//         ans += ' \\text{' + strarr[i] + '} '
//     } else {
//         ans += strarr[i]
//     }
// }

// console.log(ans)

let s = '\n2 4 3\n2 1 2\n1 3\n'
// console.log(s)
s = s.replace(/^\s*[\r\n]/gm, "")
console.log(s)


const forLoop = async(req, res) => {
    for(let i = 0; i < inputs.length; i++){
        inputs[i] = inputs[i].replace(/^\s*\n/gm, "")
        outputs[i] = outputs[i].replace(/^\s*[\r\n]/gm, "")
        
        APIData['stdin'] = inputs[i]
        // console.log(inputs[i])
        console.log(inputs[i])
        console.log(outputs[i])
        


        // const resp = await axios.post('https://api.jdoodle.com/v1/execute', APIData)
        axios.post('https://api.jdoodle.com/v1/execute', APIData).then((resp) => {
            console.log(resp.data)
            let userOutput = resp.data.output
            userOutput = userOutput.replace(/^\s*[\r\n]/gm, "")
            if(userOutput === outputs[i]) {
                console.log("correct answer for this case case", outputs[i])
            } else {
                if(accepted) {
                    accepted = false
                    res.json({"Verdict": "Wrong answer"})
                }
            }
        })
        
    }
}


