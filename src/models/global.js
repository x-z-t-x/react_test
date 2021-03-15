import { queryNotices } from '@/services/user';
// redux  全局模块
/*

请求步骤  

1.用户触发yield put  触发action  
2.根据 type属性  自动调用那个回调函数
3.回调函数写在 reducers: 里面  每个函数默认传递两个参数  state 和 当前action 
4.经过reducers处理后 返回到state里面  然后再更新视图


yield put  触发action

yield select 从state里获取数据

yield call  支持promise  可以等异步调用完成之后 在进行使用

*/

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    // 请求通知
    *fetchNotices(_, { call, put, select }) {
      // 等到请求回来再拿到数据   call是支持promise  支持异步回调 
      const data = yield call(queryNotices);

      // 拿到返回的请求数据  payload json
      yield put({
        type: 'saveNotices',
        payload: data,
      });

      // select  用于从state里获取数据   过滤掉元素read为false的 返回一个新数组
      const unreadCount = yield select(
        (state) => state.global.notices.filter((item) => !item.read).length,
      );
      // 用于触发action  更新视图
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    // 清除通知
    *clearNotices({ payload }, { put, select }) {
      // 更新视图   传入删除的数据  更新视图
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select((state) => state.global.notices.length);
      const unreadCount = yield select(
        (state) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    // 获取响应状态
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select((state) =>
        state.global.notices.map((item) => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter((item) => !item.read).length,
        },
      });
    },
  },
  // 计算过程   
  reducers: {

    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(
      state = {notices: [],collapsed: true,},{ payload },
      ) {
      return {
        ...state,
        collapsed: false,
        notices: state.notices.filter((item) => item.type !== payload),
      };
    },
  },
};

export default GlobalModel;
