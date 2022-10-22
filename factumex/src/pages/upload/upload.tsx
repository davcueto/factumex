import React, { useEffect, useState } from 'react';
import './style.css';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Button } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {storage} from '../../config/firebaseConfig';
import { ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage"

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

const UploadComponent = () => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<any[]>([]);
    const [imageUrls, setImageUrls] = useState<any[]>([]);
    const imageListRef = ref(storage, "files/")

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const uploadImages = () => {
        console.log(fileList)
        fileList.forEach(element => {
            const storageRef = ref(storage, `files/${element.name}`);
            const uploadTask = uploadBytesResumable(storageRef, element);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    // download url
                }
            );
        });
    }

    const handleMostrarImagenes = () => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        })
    }

    return (
        <>
            <div style={{margin: '2%'}}>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    accept=".png, .jpeg, .jpg"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            <div style={{margin: '2%'}}>
                <Button type="primary" onClick={uploadImages}>Subir imagenes a bucket</Button>
            </div>
            <div style={{margin: '2%'}}>
                <Button type="primary" onClick={handleMostrarImagenes}>Mostrar imagenes</Button>
            </div>
            <div style={{margin: '2%'}}>
                {imageUrls.map((url, index) => {
                    return <img src={url} key={index} />;
                })}
            </div>
        </>
    )

}

export default UploadComponent;