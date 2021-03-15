import react, { Component } from 'react'
import style from './index.less'
import Header from '@/pages/AIcenter/components/header'


export default class AIcenter extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={style.container}>
                <Header />
                <div className={style.main}>

                    <div className={style.left}>
                        
                    </div>

                    <div className={style.right}>

                    </div>

                </div>
            </div>
        )
    }

}