export const problemCompilation = (req, res) => {
    const { code, language } = req.body;
    console.log(code)
    // TODO -> Code compiliation
    res.send("Problem received")
}