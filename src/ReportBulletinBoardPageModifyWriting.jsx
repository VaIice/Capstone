import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useRef } from "react";

const cookies = new Cookies()

export default function ReportBulletinBoardPageModifyWriting(bnum) {
    // 사용자가 적고 있는 이메일 
    const [title, setTitle] = useState('');
    // // 사용자가 적고 있는 비밀번호
    const [contents, setContents] = useState('');
    // 이메일이 유효한 형식인지 확인
    const [titleValid, setTitleValid] = useState(true);
    // 핸드폰 번호가 유효한 형식인지 확인
    const [contentsValid, setContentsValid] = useState(true);
    const [flag, setFlag] = useState(false);
    const [imageFlag, setImageFlag] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [fileId, setFileId] = useState([]);

    useEffect(() => { 
        const fetchData = async () => {
            if (cookies.get('secret') === 0) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/boards/REPORT/${bnum.bno}/withImages`);
                    setTitle(response.data.title);
                    setContents(response.data.content);
                    setNotAllow(true);
                    setFlag(false);
                    setFile(response.data.fileNames);
                    setFileId(response.data.imageIds);
                    setNotAllow(true);
                    if (response.data.fileNames[0]) {
                        setFileExist(true);
                        setImageFlag(true);
                    }
                    else {
                        setFileExist(false);
                        setImageFlag(false);
                    }
                    (response.data.secret === 0 ? setSecret(false) : setSecret(true));
                } catch (error) {
                    alert('예상치 못한 문제를 발견하였습니다.');
                    goToReportBulletinBoard();
                }
            }
            else {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/boards/REPORT/${bnum.bno}/withImages`, {
                        headers: {
                            'Authorization': `Bearer ${cookies.get('accessToken')}`,
                        }
                    });
                    setTitle(response.data.title);
                    setContents(response.data.content);
                    setSecret(true);
                    setNotAllow(true);
                    setFlag(false);
                    setFile(response.data.fileNames);
                    setFileId(response.data.imageIds);
                    setNotAllow(true);
                    if (response.data.fileNames[0]) {
                        setFileExist(true);
                        setImageFlag(true);
                    }
                    else {
                        setFileExist(false);
                        setImageFlag(false);
                    }
                } catch (error) {
                    alert('예상치 못한 문제를 발견하였습니다.');
                    goToReportBulletinBoard();
                }
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (titleValid && contentsValid && flag === true) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }

    }, [titleValid, contentsValid, title, contents, flag]);

    const [secret, setSecret] = useState(false);

    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const goToNoticeBoard = () => {
        navigate("/NoticeBoard");
    }

    
    const goToLogin = () => {
        navigate("/Login");
    }

    const goToFreeBulletinBoard = () => {
        navigate("/FreeBulletinBoard");
    }

    const goToReportBulletinBoard = () => {
        navigate("/ReportBulletinBoard");
    }

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setFlag(true);
        if (newTitle.length >= 1) {
            setTitleValid(true);
        }
        else {
            setTitleValid(false);
        }
    }

    const textarea = useRef();

    const handleContents = (e) => {
        const newContents = e.target.value;
        setContents(newContents);
        setFlag(true);
        textarea.current.style.height = 'auto';
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
        if (newContents.length >= 1) {
            setContentsValid(true);
        }
        else {
            setContentsValid(false);
        }
    };

    const dataToSend = {
        title: title,
        content: contents,
        boardType: "REPORT",
        secret: secret
    };

    const [bno, setBno] = useState(-1);

    const onClickSecretButton = async () => {
        if (secret===true) {
            setSecret(false);
        }
        else {
            setSecret(true);
        }
        setFlag(true);
    }

    const onClickWritingButton = async () => {
        const fetchData = async () => {
        try {
            if (secret === true) {
                dataToSend.secret = 1;
                cookies.set('secret', 1, { maxAge: 60*60*24});
            }
            else {
                dataToSend.secret = 0;
                cookies.set('secret', 0, { maxAge: 60*60*24});
            }
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/boards/modify/REPORT/${bnum.bno}`, dataToSend, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (fileExist && !imageFlag) {
                for (let i = 0; i < file.length; i++) {
                    // `${process.env.REACT_APP_SERVER_URL}/boards/api/edit/${bnum.bno}`
                    const responseImage = await axios.post(`${process.env.REACT_APP_SERVER_URL}/boards/api/upload`, 
                        {
                            file: file[i],
                            boardType: "REPORT",
                            bno: bnum.bno
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${cookies.get('accessToken')}`,
                                'Content-Type': 'multipart/form-data'
                            }
                    });
                }
            }
            navigate(`/ReportBulletinBoardPage/${bnum.bno}`);
        } catch (error) {
            alert('게시글 수정을 실패하였습니다.');
        }
        };

        fetchData();
    }

    const onClickCancelButton = async () => {
        goToReportBulletinBoard();
    }


    const imageInput = useRef(null);

    const [fileExist, setFileExist] = useState(false);

    const [file, setFile] = useState('');

    const dataToSendImage = {
        file: file,
        boardType: "REPORT",
        bno: bnum.bno
    };
    
    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    const onFileSelect = async (e) => {
        if (imageFlag === true) {
            setImageFlag(false);
            for (let i = 0; i < fileId.length; i++) {
                try {
                    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/boards/api/delete/${fileId[i]}`);
                } catch (error) {
                    alert('기존의 이미지를 삭제하는데 실패하였습니다.');
                }
            }
        }

        if (e.target.files[0]) {
            if (e.target.files.length > 5) {
                alert('이미지는 5개로 제한됩니다.');
                e.target.value = null; // 파일 선택 창 초기화
                setFileExist(false);
            }
            else {
                const selectedFiles = Array.from(e.target.files);
                setFile(selectedFiles);
                setFileExist(true);
                setFlag(true);
            }
        }
        else {
          setFileExist(false); // checkbox 선택 상태로 변경
        }
    };

    const onClickSignOutButton = () => {
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        cookies.remove('email');
        alert('로그아웃이 완료되었습니다. 홈 화면으로 이동합니다.');
        goToHome();
    }

    const goToInfo = () => {
        navigate("/Information");
    }
    
    const handleDeleteImage = (index) => {
        if (imageFlag) {
            const fetchData = async () => {
                try {
                    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/boards/api/delete/${fileId[index]}`);
                } catch (error) {
                    alert('이미지를 삭제하는데 실패하였습니다.');
                }
            };
            fetchData();
        }

        const updatedFiles = [...file];
        updatedFiles.splice(index, 1);
        setFile(updatedFiles);
        setFlag(true);
        if (!updatedFiles[0]) {
            setFileExist(false);
        }
    };

    return (
        <div className="page12345">
            <img src="/assets/image/background.jpg" alt="background" className='wallPaper123'/>
            <div className="upperSpace123">
                <div className="upperHomeWrap">
                    <button class="upperHome123" onClick={goToHome}>HOME</button>
                </div>

                <div className="upperNoticeWrap">
                    <button className="upperNotice123" onClick={goToNoticeBoard}>NOTICE</button>
                </div>

                <div className="upperGuideWrap">
                    <button className="upperGuide123" onClick={goToInfo}>GUIDE</button>
                </div>

                <div className="upperCommunityWrap">
                    <button className="upperCommunity123"  onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                        COMMUNITY
                        {isDropdownVisible && (
                            <div className="dropdownMenu123">
                                <li onClick={goToFreeBulletinBoard} className="dropdownWord">자유 게시판</li>
                                <li onClick={goToReportBulletinBoard} className="dropdownWord">신고 게시판</li>
                            </div>
                        )}
                    </button>
                </div>
                { cookies.get('accessToken') ? (
                        <div className="upperLoginAndSignOutWrap">
                            <div className="upperInfoWrap123">
                              <button className="upperLogin123" onClick={goToInfo}>INFO</button> 
                            </div>
                            <div className="upperSignOutWrap">
                                <button className="upperLogin123" onClick={onClickSignOutButton}>LOGOUT</button> 
                            </div>
                        </div>
                    ) : (
                        <div className="upperLoginWrap">
                            <button className="upperLogin123" onClick={goToLogin}>LOGIN</button>
                        </div>
                )}
            </div>

            <div className="contentWrap123">
                <div className = "BulletinBoardWritingUpper">
                    <div className="BulletinBoardWritingUpperLeft">
                        <div className="BulletinBoardTitle123">신고 게시판</div>
                    </div>
                    <div className="BulletinBoardWritingUpperRight">
                        <button className="BulletinBoardSecretButton" onClick={onClickSecretButton}>
                            <span className='BulletinBoardImageWord'>비밀글</span>
                            <input
                                type="checkbox"
                                className='BulletinBoardImageCheckbox'
                                onChange={onClickSecretButton}
                                checked={secret}
                                />
                        </button>

                        <button className="BulletinBoardImageButton" onClick={onClickImageUpload}>
                            <input
                                type="file"
                                ref={imageInput}
                                accept="image/*"
                                style={{display:'none'}}
                                onChange={onFileSelect}
                                multiple
                            />
                            <span className='BulletinBoardImageWord'>이미지</span>
                            <input
                                type="checkbox"
                                className='BulletinBoardImageCheckbox'
                                checked={fileExist}
                            />
                        </button>
                    </div>
                </div>
                <div className="BulletinBoardLongLineUpper"/>
                <div className = "BulletinBoardWritingMiddle">
                    <div className = "BulletinBoardWritingTitleWrap">
                        <input
                            type = 'text'
                            className="BulletinBoardWritingTitleInput"
                            placeholder="제목"
                            value={title}
                            onChange={handleTitle}/>
                    </div>
                    <div className="BulletinBoardShortLine"/>
                    <div className = "BulletinBoardWritingContentsWrap">
                        <textarea
                                ref={textarea}            
                                type = 'text'
                                className="inputWritingContents"
                                placeholder="내용"
                                value={contents}
                                onChange={handleContents}
                                />
                    </div>
                    <div className="BulletinBoardShortLine"/>
                </div>
                <div className = "BulletinBoardWritingBottom">
                    {imageFlag && fileExist && (
                        <div className = "BulletinBoardWritingImage">
                            {file.map((file, index) => (
                                <div key={index} className="ImageContainer">
                                    <img
                                        key={index}
                                        src={file}
                                        alt={`file-${index}`}
                                        className="BulletinBoardImage"
                                    />                                    
                                    <img src="/assets/image/trash1.svg" className="trashImage" onClick={() => handleDeleteImage(index)}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {!imageFlag && fileExist && (
                        <div className = "BulletinBoardWritingImage">
                            {file.map((file, index) => (
                                <div key={index} className="ImageContainer">
                                <img
                                    key={index}
                                    src={file instanceof File ? URL.createObjectURL(file) : file}
                                    alt={`file-${index}`}
                                    className="BulletinBoardImage"
                                />                                    
                                <img src="/assets/image/trash1.svg" className="trashImage" onClick={() => handleDeleteImage(index)}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {fileExist && (
                        <div className="BulletinBoardWritingFileBottomLine"/>
                    )}
                    <div className = "BulletinBoardWritingButtonWrap">
                        <button className='BulletinBoardWritingButton' disabled={notAllow} onClick={onClickWritingButton}>글쓰기</button>  
                        <button className='BulletinBoardWritingCancelButton' onClick={onClickCancelButton}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )}