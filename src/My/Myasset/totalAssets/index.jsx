import React, { Component } from 'react'
import ReactDOM from 'react-dom'    //下拉刷新组件依赖react-dom，所以需要将其引进来
import { allMoney } from '../../../apis/My'
import Header from '../../../common/header'
import './index.scss'
import { PullToRefresh, ListView } from 'antd-mobile';

class Total extends Component {
  constructor(props) {
    super(props);
    // ListView自己带有的方法ListViewDataSource为ListView组件提供高性能的数据处理和访问。我们需要调用方法从原始输入数据中抽取数据来创建ListViewDataSource对象，并用其进行数据变更的比较。原始输入数据可以是简单的字符串数组，也可以是复杂嵌套的对象——分不同区(section)各自包含若干行(row)数据。
   // 要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法（如果用到了section，则对应cloneWithRowsAndSections方法）。数据源中的数据本身是不可修改的，所以请勿直接尝试修改。clone方法会自动提取新数据并进行逐行对比（使用rowHasChanged方法中的策略），这样ListView就知道哪些行需要重新渲染了。
    const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.pageNo = 1 //定义分页信息

    this.state = {
      dataSource,//存储ListViewDataSource数据是否渲染比对方法
      refreshing: true,//刷新提示文案显示
      isLoading: true,//加载文案显示
      height: document.documentElement.clientHeight,//默认高度
      useBodyScroll: false,//如果使用useBodyScroll属性在listView组件的外面就不要在放其他的元素。否则onScroll事件会失效。
      hasMore: true,//数据加载完毕之后为false
      allmoney: 0,//展示总资产
    };
  }

  //数据更新的时候判断onScroll事件
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  // 挂载之后执行
  async componentDidMount() {
    // 
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    // 初始化列表数据
    this.rData = (await this.allMoneys());
    // 更新状态
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      height: hei,
      refreshing: false,
      isLoading: false,
    });
  }

  // 获取数据
  allMoneys = async () => {

    const allMoneys = await allMoney({
      page: this.pageNo
    })
    if (allMoneys.data.code === 200) {
      this.setState(() => {
        return {
          allmoney: allMoneys.data.data.total
        }
      })
      // 当数据加载完毕
      // alert(allMoneys.data.data.total_assets.data.length)
      if (allMoneys.data.data.total_assets.data.length === 0) {
        // this.state.hasMore = false
        this.setState(() => {
          return {
            hasMore: false
          }
        })
        return []
      }
      // 当有数据返回数据源
      return allMoneys.data.data.total_assets.data
    }
  }

  // 下拉刷新时触发
  onRefresh = async () => {
    // 重置pageNo
    this.pageNo = 1
    // 重置列表数据
    this.rData = (await this.allMoneys());
    // 更新状态
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false,
      isLoading: false,
    });
    console.log(this.state.isLoading);
  };

  // 上拉加载的时候触发
  onEndReached = async () => {

    //如果this.state.hasMore为false，说明没数据了，直接返回
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }   
    this.pageNo++
    // 完善请求数据为空不再执行
    if (await this.allMoneys() === undefined) {
      this.setState(() => {
        return {
          isLoading: false
        }
      })
      return
    }

    this.setState({ isLoading: true });
    this.rData = [...this.rData, ...((await this.allMoneys()))];  //每次下拉之后将新数据装填过来
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  render() {
    //这里就是个渲染数据，rowData就是每次过来的那一批数据，已经自动给你遍历好了，rouID可以作为key值使用，直接渲染数据即可
    const row = (res, sectionID, index) => {
      return (
        <li key={index}>
          {/* <p>{res.type}</p> */}
          <p className={res.type === 1 ? '' : 'hidden'}>充值</p>
          <p className={res.type === 2 ? '' : 'hidden'}>提现</p>
          <p className={res.type === 103 ? '' : 'hidden'}>下单</p>
          <p className={res.type === 15 ? '' : 'hidden'}>提现手续费</p>
          <p className={res.type === 8 ? '' : 'hidden'}>转帐</p>
          <p className={res.type === 20 ? '' : 'hidden'}>c2c买入</p>
          <p className={res.type === 21 ? '' : 'hidden'}>c2c卖出</p>
          <p className={res.type === 23 ? '' : 'hidden'}>c2c手续费</p>
          <p className={res.type === 100 ? '' : 'hidden'}>每天收益</p>
          <p className={res.type === 101 ? '' : 'hidden'}>直接上级收益</p>
          <p className={res.type === 102 ? '' : 'hidden'}>团队上级返利</p>
          <p className={res.type === 106 ? '' : 'hidden'}>产品兑换</p>
          <p className={res.type === 105 ? '' : 'hidden'}>产品续费</p>
          <p className={res.type === 104 ? '' : 'hidden'}>分享奖励</p>
          <p className={res.type === 30 ? '' : 'hidden'}>游戏币添加</p>
          <p className={res.type === 31 ? '' : 'hidden'}>游戏币减少</p>
          <p className={res.type === 32 ? '' : 'hidden'}>平台币转游戏币</p>
          <p className={res.type === 33 ? '' : 'hidden'}>游戏币转平台币</p>
          <p className={res.type === 34 ? '' : 'hidden'}>平台币添加</p>
          <p className='message_time'>{res.addtime}</p>
          <p>{res.amount}</p>
        </li>
      );
    };
    return (
      <div id='total'>
        <Header title='总资产' />
        <div className='content'>
          {/* 资产显示 */}
          <div className='assetshow'>
            <span>总资产</span>
            <p>{ this.state.allmoney }</p>
          </div>
          {/* 记录列表 */}
          <div className='content_list'>
            {/* 表头 */}
            <div className='list_title'>
              <p>类型</p>
              <p>时间</p>
              <p>金额</p>
            </div>
            {/* 列表 */} {/* PullToRefresh下拉刷新 */}
            <ListView
              key={this.state.useBodyScroll ? '0' : '1'}
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={    //renderFooter就是下拉时候的loading效果，这里的内容可以自己随需求更改
                () => (
                  <div>
                    {this.state.isLoading ? '加载中...' : '没有更多了~'}
                  </div>
                )
              }
              renderRow={row}   //渲染你上边写好的那个row
              useBodyScroll={this.state.useBodyScroll}
              style={this.state.useBodyScroll ? {} : {
                height: this.state.height
              }}

              // 加入下拉刷新模块
              pullToRefresh={<PullToRefresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />}
              onEndReached={this.onEndReached}
              pageSize={8}    //每次下拉之后显示的数据条数
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Total