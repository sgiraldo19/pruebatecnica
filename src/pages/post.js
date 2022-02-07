import { useEffect, useState } from 'react';
import axios from "axios";
import { Grid, Paper, Typography, Modal, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useUserContext } from "../context/userContext";
import { useAuth } from "../firebase";
import { async } from '@firebase/util';
import '../Styles/Post.css';
import '../Styles/Login.css';


const url = "https://waco-api.herokuapp.com/api/posts";
const urlall = "https://waco-api.herokuapp.com/api/posts/all";
const urlput = "https://waco-api.herokuapp.com/api/posts/";
const urlusersposts = "https://waco-api.herokuapp.com/api/users/";

const Posts = (authorized) => {

    const { user, logoutUser } = useUserContext();
    const currentUser = useAuth();
    const [data, setData] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);


    const [postInsertado, setPostInsertado] = useState({
        title: "",
        body: "",
        user_uuid: user.uid,
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setPostInsertado(prevState => ({
            ...prevState,
            [name]: value
        }))
        //console.log(postInsertado);
    }

    /* const petitionGet= async()=>{
        await axios.get(url).then(response =>{
            console.log({data: response.data});
            setData(response.data);
        })
    } */

    /* const petitionGetAll= async()=>{
        await axios.get(urlall).then(response =>{
            //console.log({data: response.data});
            setData(response.data);
        })
    } */

    const petitionGetAlluserPosts = async () => {
        await axios.get(urlusersposts + user.uid + "/post").then(response => {
            //console.log({data: response.data});
            setData(response.data);
        })
    }

    const petitionPost = async () => {
        await axios.post(url, postInsertado).then(response => {
            console.log(response);
            console.log(response.data);
            //setData(data.concat(response.data));
            openCloseModalInsert();
        })
    }

    const petitionPut = async () => {
        await axios.put(urlput + postInsertado.id, postInsertado)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(post => {
                    if (postInsertado.id === post.id) {
                        post.title = postInsertado.title;
                        post.body = postInsertado.body;
                    }
                })
                setData(dataNueva);
                openCloseModalEdit();
            })
    }

    const petitionDelete = async () => {
        await axios.delete(urlput + postInsertado.id)
            .then(response => {
                console.log(response);
                console.log(response.data);
                //setData(data.filter(post=>post.id!==postInsertado.id));
                openCloseModalDelete();
            })
    }

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
    }

    const openCloseModalEdit = () => {
        setModalInsert(!modalInsert);
    }

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    }

    const selectPost = (post, caso) => {
        setPostInsertado(post);
        (caso === 'Edit') ? openCloseModalEdit() : openCloseModalDelete()
    }

    useEffect(async () => {
        await petitionGetAlluserPosts();
    }, [])

    const ModalBody = (
        <div className='modal_body'>
            <h3>Agregar nuevo post</h3>
            <TextField name="title" className='input_post' label="Titulo" onChange={handleChange}></TextField>
            <br />
            <TextField name="body" className='input_post' label="Post" onChange={handleChange}></TextField>
            <br />
            <div>
                <Button color='primary' onClick={() => petitionPost()}>Insertar</Button>
                <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
            </div>
        </div>
    )

    const ModalBodyEdit = (
        <div className='modal_body'>
            <h3>Editar body</h3>
            <TextField name="title" className='input_post' label="Titulo" onChange={handleChange} value={postInsertado && postInsertado.title}></TextField>
            <br />
            <TextField name="body" className='input_post' label="Post" onChange={handleChange} value={postInsertado && postInsertado.body}></TextField>
            <br />
            <div>
                <Button color='primary' onClick={() => petitionPut()}>Insertar</Button>
                <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
            </div>
        </div>
    )

    const ModalBodyDelete = (
        <div className='modal_body'>
            <p>Esta seguro que desea elminar el post? <b>{postInsertado && postInsertado.nombre}</b></p>
            <div>
                <Button color='secondary' onClick={() => petitionDelete()}>Si</Button>
                <Button onClick={() => openCloseModalDelete()}>No</Button>
            </div>
        </div>
    )


    return (
        <div className='posts'>
            <div className='nav_posts'>
                <Button style={{ color: "rgba(255,255,255)" }} className="log_outB" onClick={logoutUser}>Log out</Button>
            </div>
            <Grid container className='posts_grid'>
                {data.data?.map(post => (
                    <Grid item key={post.id}>{/*KeyContent*/}
                        <Card className='post_card'>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {post.title}
                                    </Typography>
                                    <Typography component="p">{post.body}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button onClick={() => selectPost(post, 'Edit')} size="small" color="primary"> Update</Button>
                                <Button onClick={() => selectPost(post, 'Eliminar')} size="small" color="primary"> Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Button style={{ color: "rgba(0,0,0)" }} onClick={() => openCloseModalInsert()}>Nuevo Post</Button>

            <Modal open={modalInsert}
                onClose={openCloseModalInsert}>
                {ModalBody}
            </Modal>

            <Modal open={modalEdit}
                onClose={openCloseModalEdit}>
                {ModalBodyEdit}
            </Modal>

            <Modal open={modalDelete}
                onClose={openCloseModalDelete}>
                {ModalBodyDelete}
            </Modal>

        </div>

    );
}

export default Posts;