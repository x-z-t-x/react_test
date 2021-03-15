import react,{Component} from 'react'
import style from  './index.less'

export default class Header extends Component{

    constructor(props){
       super(props);
       //const {head_msg} =props;
       const head_msg = "AI中台";
       this.state={
           head_msg:head_msg
       }
    }
    render(){
        return(
            <div className={style.head}>
                {this.state.head_msg}
            </div>
        )
    }

}