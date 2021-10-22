import axios from 'axios';
import ProblemSet from '../models/problemSet'


const RESOLVER = {
    "C++": "cpp17",
    "Python": "python3",
    "Java": "java",
    "C": "c"
}


export const problemCompilation = async(req, res) => {
    let { code, language, userInput, problemID, submissionType } = req.body;
    console.log(problemID)
    language = RESOLVER[language]

    if(submissionType !== 'test' && submissionType !== 'submit') {
        res.status(404).send('Not found');
    }

    const APIData = {
        "script": code,
        "language": language,
        "clientId": "e67139a8317554984daafaa1fce69d93",
        "clientSecret": "4a231fff8bf76c4f40e427ca7551cf5c96d67ab61d835307f478c78b7ff70ec4",
        "stdin": ""
    }


    if(submissionType === 'test') {
        APIData['stdin'] = userInput
        const resp = await axios.post('https://api.jdoodle.com/v1/execute', APIData)
        res.send(resp.data);
    } else {
        ProblemSet.findById(problemID, async(err, problemDocument) => {
            if(err) {
                res.status(404).send("Invalid request")
            }
            const problem = problemDocument.toObject()
            let inputs = problem['input']
            // console.log(inputs)
            let outputs = problem['output']

            let promises = []
             
            for(let i = 0; i < inputs.length; i++) {
                inputs[i] = inputs[i].replace(/^\s*\n/gm, "")
                outputs[i] = outputs[i].replace(/^\s*[\r\n]/gm, "")
                APIData['stdin'] = inputs[i]
                promises.push(axios.post('https://api.jdoodle.com/v1/execute', APIData))
            }


            let accepted = true
            const results = await Promise.all(promises)
            for(let i = 0; i < inputs.length; i++) {
                let userOutput = results[i].data.output
                userOutput = userOutput.replace(/^\s*[\r\n]/gm, "")
                if(userOutput === outputs[i]) {
                    // console.log("correct answer for this case case", outputs[i])
                } else {
                    if(accepted) {
                        accepted = false
                        res.json({"Verdict": "Wrong answer"})
                        break
                    }
                }
            }
            if(accepted) res.status(200).json({"Verdict": "Correct answer"})
        })
    }
}   