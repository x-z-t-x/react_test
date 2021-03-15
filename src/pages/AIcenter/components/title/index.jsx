import react from 'react';
import {message} from 'antd';
import titleicon from "@/pages/images/累计运行.png";
import style from './index.less'

const Title = (msg) => {

    if(!msg){
        message.info("请正确输入标题");
    }

    return (

        <div className={style.title}>
            <img src={titleicon} alt=""/>
            <span className={title_msg}>{msg}</span>
        </div>

    )

}

export default Title;