import React, { useRef, useState, useEffect } from 'react';
import './uploadImage.scss';
import { PinDropSharp } from '@material-ui/icons';
import axios from 'axios';

const UploadImage = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const onDeleteImage = (e) => {
        e.preventDefault();
        setPreviewUrl(null);
        setFile(null);
        if (props.callbackImage) {
            props.callbackImage(null);
        }
    }

    const filePickerRef = useRef();
    useEffect(() => {

        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        if (props.callbackImage) {
            props.callbackImage(file);
        }

    }, [file])
    const pickedHandler = (e) => {
        e.preventDefault();
        let pickedFile;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
        // console.log(pickedFile);
        // props.onInput(props.id, pickedFile, isValid);
    }
    const pickImageHandler = (e) => {
        e.preventDefault();
        filePickerRef.current.click();
    }
    return (
        <div>
            <div className="form-control">
                <input
                    type="file"
                    id={PinDropSharp.id}
                    style={{ display: 'none' }}
                    accept=".jpg, .png, .jpeg"
                    ref={filePickerRef}
                    onChange={pickedHandler}
                />
                <div style={{ padding: '10px 10px', width: '100%', marginBottom: '10px', textAlign: 'center', borderStyle: previewUrl ? `none` : `dashed` }} className="image-upload">
                    {previewUrl ? (<span></span>) : (<div><h1>Add Photo</h1><h4>(Max:500KB)</h4></div>)}
                    <div className="image_preview">
                        {previewUrl && (<div style={{
                            right: '0', marginRight: '20%', zIndex: '10', cursor: 'pointer',
                            backgroundColor: 'white', borderRadius: '50%', lineHeight: '25px',
                            position: 'absolute', fontSize: '20px', width: '25px', height: '25px'
                        }} onClick={onDeleteImage}>
                            x
                        </div>)}

                        {previewUrl && <img src={previewUrl} alt="Preview" style={{ position: 'relative', margin: 'auto', display: 'block', width: '60%', height: '60%' }} />}
                        {!previewUrl && <i style={{ cursor: 'pointer' }} className="file image outline massive icon" onClick={pickImageHandler} />}

                    </div>

                    {/* {previewUrl ? (<button onClick={onDeleteImage}>reset</button>) : (<button onClick={pickImageHandler}>pick</button>)} */}

                </div>
            </div>
        </div >
    )
}

export default UploadImage;