import React from "react";
import { useForm } from "react-hook-form";
import {Container} from '@material-ui/core';
import useStyles from "./styles";
import Select from 'react-select';
const AddContest = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    const classes = useStyles();

    const tags = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
  return (
    <Container className={classes.container} maxWidth="sm">
    <h1 className={classes.h1}>Create Problem</h1>
    <form className = {classes.form}onSubmit={handleSubmit(onSubmit)}>
          <label className= {classes.label} htmlFor="contestName">Problem Name:</label>
          <input className= {classes.input}
              {...register("problemName", { required: "This is required." })}
              id="problemName" />
          {errors.firstName && <p className={classes.p}>{errors.firstName.message}</p>}
          <label className={classes.label} htmlFor="problemStatement">Problem Statement: </label>
          <textarea name="problemStatement" placeholder="Enter the problem statement" className={classes.input}></textarea>
          <label className={classes.label} htmlFor="tags">Tags: </label>
          <Select className = {classes.dropdown} isMulti options={tags}/>
          <input className= {classes.submitButton} value="Next" type="submit" />
      </form>
      </Container>
  );
};

export default AddContest;