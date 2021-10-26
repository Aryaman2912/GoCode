import React from "react";
import { useForm } from "react-hook-form";
import { Container } from "@material-ui/core";
import useStyles from "./styles";
import Select from "react-select";

class Challenge {
  constructor(
    name,
    description,
    statement,
    tags,
    input,
    output,
    testinput,
    testoutput
  ) {
    this.name = name;
    this.description = description;
    this.statement = statement;
    this.tags = tags;
    this.input = input;
    this.output = output;
    this.testinput = testinput;
    this.testoutput = testoutput;
  }
}
const AddContest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const classes = useStyles();

  const tags = [
    { value: "flows", label: "flows" },
    { value: "graph matchings", label: "graph matchings" },
    { value: "graphs", label: "graphs" },
    { value: "greedy", label: "greedy" },
    { value: "binary search", label: "binary search" },
    { value: "dp", label: "dp" },
    { value: "geometry", label: "geometry" },
    { value: "brute force", label: "brute force" },
    { value: "data structures", label: "data structures" },
    { value: "implementation", label: "implementation" },
    { value: "sortings", label: "sortings" },
    { value: "constructive algorithms", label: "constructive algorithms" },
    { value: "two pointers", label: "two pointers" },
    { value: "dfs and similar", label: "dfs and similar" },
    { value: "hashing", label: "hashing" },
    { value: "bitmasks", label: "bitmasks" },
    { value: "meet-in-the-middle", label: "meet-in-the-middle" },
    { value: "combinatorics", label: "combinatorics" },
    { value: "math", label: "math" },
    { value: "dsu", label: "dsu" },
    { value: "divide and conquer", label: "divide and conquer" },
    { value: "strings", label: "strings" },
    { value: "interactive", label: "interactive" },
    { value: "number theory", label: "number theory" },
    { value: "shortest paths", label: "shortest paths" },
    { value: "trees", label: "trees" },
    { value: "probabilities", label: "probabilities" },
    { value: "string suffix structures", label: "string suffix structures" },
    { value: "fft", label: "fft" },
    { value: "matrices", label: "matrices" },
    { value: "2-sat", label: "2-sat" },
    { value: "ternary search", label: "ternary search" },
    { value: "games", label: "games" },
    { value: "chinese remainder theorem", label: "chinese remainder theorem" },
    { value: "dfs", label: "dfs" },
    { value: "Array", label: "Array" },
    { value: "trie", label: "trie" },
    { value: "linked list", label: "linked list" },
    { value: "sliding window", label: "sliding window" },
    { value: "stack", label: "stack" },
    { value: "queue", label: "queue" },
  ];
  let ch = new Challenge();
  return (
    <Container className={classes.container} maxWidth="sm">
      <h1 className={classes.h1}>Create Problem</h1>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label} htmlFor="contestName">
          Problem Name:
        </label>
        <input
          className={classes.input}
          {...register("problemName", { required: "This is required." })}
          id="problemName"
        />
        {errors.firstName && (
          <p className={classes.p}>{errors.firstName.message}</p>
        )}
        <label className={classes.label} htmlFor="problemStatement">
          Problem Statement:{" "}
        </label>
        <textarea
          name="problemStatement"
          placeholder="Enter the problem statement"
          className={classes.input}
        ></textarea>
        <label className={classes.label} htmlFor="tags">
          Tags:{" "}
        </label>
        <Select className={classes.dropdown} isMulti options={tags} />
        <input className={classes.submitButton} value="Next" type="submit" />
      </form>
    </Container>
  );
};

export default AddContest;
