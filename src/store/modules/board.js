const state = {
  boards: [
    // { key: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528301429389&di=9ba057251bee5ac18a9510acfa6cafac&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F86%2F63%2F54D58PICRKh_1024.jpg',checked:false},
    // { key: require('../../../static/images/pullUp.png'),checked:false},
    // {key: require('../../../static/images/upload.png'), checked: false},
    {
      key: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397176&di=ab7020301ebdb94d00fef168bbfb0d8c&imgtype=0&src=http%3A%2F%2Fimg.liketrip.cn%2Fjqphoto%2F2008-06-02%2F200806020856405.jpg',
      checked: true
    },
    {
      key: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397177&di=c200ee3317a885cc0c22bdc646190468&imgtype=0&src=http%3A%2F%2Fpic10.nipic.com%2F20101024%2F3510519_133641009589_2.jpg',
      checked: false
    },
    {
      key: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397176&di=c8d7f9e27831eacb0a025256902caa92&imgtype=0&src=http%3A%2F%2Fimg3.fengniao.com%2Factive%2F20120627_lsb%2Fs%2F2%2F1100_800600.jpg',
      checked: false
    },
    {
      key: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397176&di=4399dab3a98727529722520a3c56827f&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheying%2F20140816%2Fwudingshangfangdefoxiangge_2867767.jpg',
      checked: false
    },
    {
      key: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397176&di=745a8bfc56c93932d6ff02b077496a9d&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Flvpics%2Fh%3D800%2Fsign%3D5bbc5a8754fbb2fb2b2b55127f4b2043%2Fcb8065380cd79123958fc6aeac345982b3b780f8.jpg',
      checked: false
    },
    {
      key: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397175&di=5c7cc67a133c668e82dd4c7a9decc4cd&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F20%2F71%2F01300000335934123587710287861.jpg',
      checked: false
    },
  ],
  words: [
    '佛香阁是北京市颐和园的主体建筑，建筑在万寿山前山高20米的方形台基上，南对昆明湖，背靠智慧海，以它为中心的各建筑群严整而对称地向两翼展开，形成众星捧月之势，气派相当宏伟。佛香阁高41米，8面3层4重檐，阁内有8根巨大铁梨木擎天柱，结构相当复杂，为古典建筑精品。',
    '北京的佛香阁是一座宏伟的塔式宗教建筑，为全颐和园建筑布局的中心。"佛香"二字来源于佛教对佛的歌颂。该阁仿杭州的六和塔建造，兴建在20米的石造台基上，八面三层四重檐。高约40米，内有八根铁梨木大柱，直贯顶部，下有20米高的石台基。阁上层榜曰 “式延风教”。',
    '佛香阁高41米，建筑在20米高的石造台基上，内有八根坚硬的铁梨木巨柱支撑，结构复杂，独具匠心，高台矗立，气势磅礴。它将东边的圆明园、畅春园，西边的静明园、静宜园以及万寿山周转十几里以内的优美风景提携于周围，把当时的“三山五园”巧妙地加成一体，使之成为一个大型皇家园林风景区 。',
    '阁仗山雄，山因阁秀，万寿山在远处西山群峰的屏嶂和近处玉泉山的陪衬下，小中见大，气势非凡，苍松佛香阁与昆明湖翠柏，秀色葱茏。佛香阁面对的昆明湖又恰到好处地把这个画面全部倒映出来，山之葱茏，水之澄碧，天光接引，令人荡气舒怀。中国造园家们所津津乐道的造园手法--借景、在这里得到了完美的运用和体现。'
  ],
  locations: [
    '北京', '北京-佛香阁', '北京-海淀区', '北京-颐和园'
  ],
  goLink: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397176&di=ab7020301ebdb94d00fef168bbfb0d8c&imgtype=0&src=http%3A%2F%2Fimg.liketrip.cn%2Fjqphoto%2F2008-06-02%2F200806020856405.jpg',
  goLinks: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397176&di=ab7020301ebdb94d00fef168bbfb0d8c&imgtype=0&src=http%3A%2F%2Fimg.liketrip.cn%2Fjqphoto%2F2008-06-02%2F200806020856405.jpg'],
  address: '',
  windowWidth: 0,
  windowHeight: 0,
  visitFont: '佛香阁是北京市颐和园的主体建筑，建筑在万寿山前山高20米的方形台基上，南对昆明湖，背靠智慧海，以它为中心的各建筑群严整而对称地向两翼展开，形成众星捧月之势，气派相当宏伟。佛香阁高41米，8面3层4重檐，阁内有8根巨大铁梨木擎天柱，结构相当复杂，为古典建筑精品。',
  isClickrule: true,
  isClickrulr: false,
  isClickruly: false,
  isClickrulo: false,
  chooseImage: '',
  chooseIndex: 0,
  chooseIndexNow: 0,
  isabled: true,
  location: require('../../../static/images/location.jpg'),
  nickName: '',
  avatarUrl: ''
}

export default {
  state,
}
