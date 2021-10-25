import { useEffect, useState, React } from "react";
import { Typography } from "@material-ui/core";
import ReactLoading from "react-loading";
import Playlist from "./Playlist";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Row } from "react-grid-system";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "./styles";
import { useForm } from "react-hook-form";
import {API} from '../../api/index';
import axios from "axios";
import { useHistory } from 'react-router';

const PlaylistSpace = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory()




  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('profile'))
    if(storage === null) {
        history.push('/auth')
        return
    }
    let token = storage.token
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
    }

    fetch("http://localhost:5000/playlists", {headers: headers})
      .then((data) => data.json())
      .then((data) => {
        // let tempcontests = [];
        // data.forEach((contest) => {
        //   if (contest.isPublic) {
        //     tempcontests.push(contest);
        //   }
        // });

        console.log(data);
        setPlaylists(data);
        setLoading(false);
      });
  }, []);

  // console.log(contests);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    const storage = JSON.parse(localStorage.getItem('profile'))
        // console.log(storage)
        if(storage === null) {
            history.push('/auth')
        }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleChange = (event) => {
    setFormData({ [event.target.name]: event.target.value })
  }

  const onSubmit = (data) => {
    // const time = data.time.split(':');
    // data.date.setHours(time[0]);
    // data.date.setMinutes(time[1]);
    const userId = JSON.parse(localStorage.getItem('profile'))['result']['_id'];
    data['userId'] = userId;
    data['name'] = data.playlistName
    // data['duration'] = String(data['duration']) + " hrs"
    // delete data['time'];
    const storage = JSON.parse(localStorage.getItem('profile'))
    if(storage === null) {
        history.push('/auth')
        return
    }
    let token = storage.token
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
    }
    console.log(data)
    axios.post('http://localhost:5000/playlists/create',
      data, {headers: headers}
    )
      .then((res) => {
        console.log(res.data._id)
        history.push('/addplaylist/' + res.data._id)
      })
      .catch((err) => console.log(err))
    
  };

  const classes = useStyles();
  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <ReactLoading
            type={loadingOptions.type}
            color={loadingOptions.color}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{
                  color: "white",
                  padding: "1rem 2rem ",
                  borderColor: "white",
                  marginLeft: "auto",
                  background: "#006633",
                }}
                variant="contained"
                onClick={handleClickOpen}
              >
                <Row>
                  <AddIcon />
                  <Typography
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Create Playlist
                  </Typography>
                </Row>
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Create Playlist</DialogTitle>
                <DialogContent
                  style={{
                    width: "35rem",
                  }}
                >
                  <DialogContentText></DialogContentText>
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <label className={classes.label} htmlFor="playlistName">
                      Playlist Name:
                    </label>

                    <input onChange={handleChange}
                      className={classes.input}
                      {...register("playlistName", {
                        required: "Playlist name cannot be empty.",
                      })}
                      id="playlistName"
                    />
                    {errors.playlistName && (
                      <span className={classes.p}>
                        {errors.playlistName.message}
                      </span>
                    )}
                    <input 
                      className={classes.submitButton}
                      value="Next"
                      type="submit"
                    />
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  {/* <Button onClick={handleClose} color="primary">
                    Subscribe
                  </Button> */}
                </DialogActions>
              </Dialog>
            </div>
            <Typography
              variant="h4"
              style={{
                color: "white",
              }}
            >
              Public Playlist
            </Typography>

            <Playlist data={playlists} />
            <Typography
              variant="h4"
              style={{
                color: "white",
              }}
            >
              Invited Playlist
            </Typography>
          </div>
        </>
      )}
    </>
  );
};

export default PlaylistSpace;
