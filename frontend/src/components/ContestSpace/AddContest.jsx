import React from "react";
import { useForm } from "react-hook-form";
import {Container} from '@material-ui/core';
import useStyles from "./styles";
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
  return (
    <Container className={classes.container} maxWidth="sm">
    <h1 className={classes.h1}>Create Contest</h1>
    <form className = {classes.form}onSubmit={handleSubmit(onSubmit)}>
          <label className= {classes.label} htmlFor="contestName">Contest Name:</label>
          <input className= {classes.input}
              {...register("contestName", { required: "This is required." })}
              id="contestName" />
          {errors.firstName && <p className={classes.p}>{errors.firstName.message}</p>}

          <label className= {classes.label} htmlFor="date">Date:</label>
          <input className= {classes.input} type="date" {...register("date", { required: true, valueAsDate: true })} />
          <label className= {classes.label} htmlFor="time">Start Time:</label>
          <input className= {classes.input} type="time" {...register("time", { required: true, valueAsTime: true })} />
          <label className= {classes.label} htmlFor="duration">Duration(hrs)</label>
          <input className= {classes.input}
              type="number"
              step="0.5"
              {...register("duration", { valueAsNumber:true })}
              id="duration" />
          <input className= {classes.submitButton} value="Next" type="submit" />
      </form>
      </Container>
  );
};

export default AddContest;