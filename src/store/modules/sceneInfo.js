// 保存当前景点详情页信息
const sceneInfo = {
  state: {
    basicInfo:{
      src: '',
      name: '',
    },
    detailedInfo:{

    }
    
  },

  mutations: {
    setBasicInfo: (state, basicInfo) => {
      state.basicInfo = basicInfo
    },
    setDetailedInfo: (state, detailedInfo) => {
      state.detailedInfo = detailedInfo
    }
  },
}
export default sceneInfo