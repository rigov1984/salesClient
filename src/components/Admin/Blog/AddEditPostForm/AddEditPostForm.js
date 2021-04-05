import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { Icon } from '@ant-design/compatible';
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostsApi, updatePostsApi } from "../../../../api/post";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
    const { setIsVisibleModal, setReloadPosts, post } = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
        if (post) {
            setPostData(post)
        } else {
            setPostData({});
        }
    }, [post])

    //funcion que se encarga de validar si va a crear o a modificar el post
    const processPost = e => {
        e.preventDefault();
        const { title, url, description, date } = postData;
        if (!title || !url || !description || !date) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            })
        } else {
            if (!post) {
                addPost();
            } else {
                updatePost();
            }
        }
    }

    const addPost = () => {
        const token = getAccessTokenApi();

        addPostsApi(token, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor."
                })
            })
    }

    const updatePost = () => {
        const token = getAccessTokenApi();

        updatePostsApi(token, post._id, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor."
                })
            })
    }

    return (
        <div className="add-edit-post-form">
            <AddEditForm
                postData={postData}
                setPostData={setPostData}
                post={post}
                processPost={processPost}
            />
        </div>
    )
}


function AddEditForm(props) {
    const { postData, setPostData, post, processPost } = props;

    return (
        <Form
            className="add-edit-post-form"
            layout="inline"
            onSubmitCapture={processPost}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<Icon type="font-size" />}
                        placeholder="Titulo"
                        value={postData.title}
                        onChange={e => setPostData({ ...postData, title: e.target.value })}
                    />
                </Col>

                <Col span={8}>
                    <Input
                        prefix={<Icon type="link" />}
                        placeholder="url"
                        value={postData.url}
                        onChange={e => setPostData({ ...postData, url: transformTextToUrl(e.target.value) })}
                    />
                </Col>
                <Col span={8}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY HH:mm:ss"
                        placeholder="Fecha de publicaciòn"
                        value={postData.date && moment(postData.date)}
                        onChange={(e, value) => setPostData({ ...postData, date: moment(value, "DD/MM/YYY HH:mm:ss").toISOString() })}
                    //showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                </Col>
            </Row>
            <Editor
                value={postData.description ? postData.description : ""}
                init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
                }}
                onBlur={e => setPostData({ ...postData, description: e.target.getContent() })}
            />
            <Button type="primary" htmlType="submit" className="btn-submit">
                {post ? "Actualizar post" : "Crear post"}
            </Button>
        </Form>
    )
}


function transformTextToUrl(text) {
    const url = text.replace(" ", "-");

    return url.toLowerCase();
}