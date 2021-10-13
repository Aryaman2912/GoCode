import axios from 'axios';


export const problemCompilation = async(req, res) => {
    const { code, language, userInput } = req.body;
    console.log(userInput)
    const input = {
        "script": code,
        "language": "cpp",
        "clientId": "e67139a8317554984daafaa1fce69d93",
        "clientSecret": "4a231fff8bf76c4f40e427ca7551cf5c96d67ab61d835307f478c78b7ff70ec4",
        "stdin": userInput
    }
    const resp = await axios.post('https://api.jdoodle.com/v1/execute', input)
    res.send(resp.data);
}