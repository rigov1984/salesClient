import React, { useState, useEffect } from 'react';
import { Button, notification } from "antd";
//withRouter lo usamos para indicar la pagina en la que estamos
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import PostsList from "../../../components/Admin/Blog/PostsList";
import { getPostsApi } from "../../../api/post";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";

import "./Blog.scss";

function Blog(props) {
    const { location, history } = props;
    const [posts, setPosts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    //si page no trae valor le pone 1 por defecto de lo contraio toma el valor de pague
    const { page = 1 } = queryString.parse(location.search)

    useEffect(() => {
        //al pasarle page le estamos indicando la pagina en la que esta
        getPostsApi(12, page)
            .then(response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setPosts(response.posts);
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor."
                })
            });
        setReloadPosts(false);
    }, [page, reloadPosts])

    const addPost = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo post");
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPosts={setReloadPosts}
                post={null}
            />
        )
    }

    const editPost = post => {
        setIsVisibleModal(true);
        setModalTitle("Editar post");
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPosts={setReloadPosts}
                post={post}
            />
        )
    }

    if (!posts) {
        return null;
    }
    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary" onClick={addPost}>Nuevo post</Button>
            </div>

            <PostsList posts={posts} setReloadPosts={setReloadPosts} editPost={editPost} />
            <Pagination posts={posts} location={location} history={history} />

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width="75%"
            >
                {modalContent}
            </Modal>
        </div>
    )
}

//envolvemos el componente con withRouter
export default withRouter(Blog);
