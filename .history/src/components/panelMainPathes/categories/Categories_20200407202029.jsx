
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PanelMainCategorieshead from '../../panelMain/panelMainHeads/PanelMainCategorieshead'
import PanelMain from '../../panelMain/PanelMain'
import { Tooltip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import CategoriesAddModal from '../../UI/Modals/CategoriesAddModal'
import SubCategoryAddModal from '../../UI/Modals/SubCategoryAddModal'
import CategoryDeleteDialog from '../../UI/dialogs/CategoryDeleteDioalog'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import 'react-perfect-scrollbar/dist/css/styles.css';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus, faExpand, faCompress, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

// import treeData from './treeData';
import './categories.css'

const maxDepth = 5;

const alertNodeInfo = ({ node, path, treeIndex }) => {
  const objectString = Object.keys(node)
    .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    .join(',\n   ');

  global.alert(
    'Info passed to the button generator:\n\n' +
      `node: {\n   ${objectString}\n},\n` +
      `path: [${path.join(', ')}],\n` +
      `treeIndex: ${treeIndex}`
  );
};



class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      loading: false,
      errorMsg: '',
      emptyMessage: null,
      errorOnLoadData: false,

      subBtnLoading: false,
      buttonLoading: false,

      removeInputsValue: false,
      removeSubInputsValue: false,

      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [],

      openModal: false,
      openSubModal: false,

      errorOnAdd: false,
      errorOnSubAdd: false,

      openDialog: false,
      delButtonLoading: false
    };

  }

  errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
  errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
  successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});

  componentDidMount() {

    console.log(this.props.history.push.state);

    if(this.props.history.state !== 'showCategory'){
      this.props.history.replace('/categoriesList')
    } else{

    this.setState({
      loading: true
    })
    
    let guid = this.props.categoryGuid
    axiosConfig.get('/Category/GetByGuid/' + guid, {
      headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {
      console.log(res.data);
      
      if(res.data.state === 1) {
        this.setState({
          treeData: res.data.categories,
          loading: false
        })
      }
      if(res.data.state === 2) {
        toast(res.data.message, {type: toast.TYPE.WARNING});
        this.setState({
          errorMsg: res.data.message,
          emptyMessage: res.data.message,
          loading: false
        })
      }

    }).catch(err => {

      this.errorOnCatch()
      this.setState({
        loading: false,
        errorOnLoadData: true
      })

      setTimeout(() => {
        this.props.history.goBack()
      }, 1500);
    })

  }
  }

  openModal = () => {
    this.setState({
      openModal: true,
      removeInputsValue: false
    })
  }

  closeModal = () => {
    this.setState({
      openModal: false,
      errorOnAdd: false
    })
  }

  closeSubModal = () => {
    this.setState({
      openSubModal: false,
      errorOnSubAdd: false
    })
  }


  createNodeHandler = (nodeName, nodeOrder) => {

    if(nodeName.length === 0 || nodeOrder.length === 0) {
      this.setState({errorOnAdd: true})
    }else{
      this.setState({
        buttonLoading: true,
        openModal: true,
        removeInputsValue: true,
        errorOnAdd: false
      })
  
      axiosConfig.post('/Category/Create', {
        categoryGuid: this.props.categoryGuid,
        name: nodeName,
        order: nodeOrder
      }, {
        headers: { Authorization: "Bearer " + this.props.token }
  
      }).then(res => {
        axiosConfig.get('/Category/GetByGuid/' + this.props.categoryGuid, {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
          console.log(res.data);
          
          this.setState({
            treeData: res.data.categories,
            openModal: false,
            buttonLoading: false,
            removeInputsValue: false
          })
    
        }).catch(err => {
          this.errorOnCatch()
          this.setState({
            openModal: false,
            buttonLoading: false,
            removeInputsValue: false
          })
        })
  
      }).catch(err => {
        this.errorOnCatch()
        this.setState({
          openModal: false,
          buttonLoading: false,
          removeInputsValue: false
        })
      })
    }

  }

  // sub
  // sub

  openSubModalHandler = (rowInfo) => {

    this.setState({
      openSubModal: true,
      removeSubInputsValue: true
    })

    this.createSubNodeHandler = (nodeName, nodeOrder) => {

      if(nodeName.length === 0 || nodeOrder.length === 0) {
        this.setState({errorOnSubAdd: true})
      }else{
        this.setState({
          subBtnLoading: true,
          errorOnSubAdd: false
        })
        axiosConfig.post('/Category/Create', {
          categoryGuid: rowInfo.node.guid,
          name: nodeName,
          order: nodeOrder
        }, {
          headers: { Authorization: "Bearer " + this.props.token }

        }).then(res => {
            axiosConfig.get('/Category/GetByGuid/' + this.props.categoryGuid, {
            headers: { Authorization: "Bearer " + this.props.token }
          }).then(res => {
            console.log(res.data);
            
            this.setState({
              treeData: res.data.categories,
              openSubModal: false,
              subBtnLoading: false,
              removeSubInputsValue: false
            })
      
          }).catch(err => {
            this.errorOnCatch()
            this.setState({
              openSubModal: false,
              subBtnLoading: false,
              removeSubInputsValue: false
            })
          })

        }).catch(err => {
          this.errorOnCatch()
          this.setState({
            openSubModal: false,
            subBtnLoading: false,
            removeSubInputsValue: false
          })
        })
      }
    }
  }


  closeDialogHandler = () => {
    this.setState({openDialog: false})
  }

  openDialogHandler = (rowInfo) => {
    this.setState({
      openDialog: true
    })

    this.handleDeleteNode = () => {
      this.setState({
        delButtonLoading: true
      })

      axiosConfig.post('/Category/Delete/', {
        guid: rowInfo.node.guid
      }, {
        headers: { Authorization: "Bearer " + this.props.token }
      }).then(res => {
        axiosConfig.get('/Category/GetByGuid/' + this.props.categoryGuid, {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
          
          this.setState({
            treeData: res.data.categories,
            openDialog: false,
            delButtonLoading: false
          })
    
        }).catch(err => {
          this.errorOnCatch()
          this.setState({
            openDialog: false,
            delButtonLoading: false
          })
        })
      }).catch(err => {
        this.errorOnCatch()
        this.setState({
          openDialog: false,
          delButtonLoading: false
        })
      })
     
    }
  }
  

//   *****
//   *****

// addNode(rowInfo){

  handleTreeOnChange = treeData => {
    this.setState({ treeData });
  };

  handleSearchOnChange = e => {
    this.setState({
      searchString: e.target.value,
    });
  };

  selectPrevMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1,
    });
  };

  selectNextMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0,
    });
  };

  toggleNodeExpansion = expanded => {
    this.setState(prevState => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded,
      }),
    }));
  };

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount
    } = this.state;

    const useStylesBootstrap = makeStyles(theme => ({
        arrow: {
          color: theme.palette.common.black,
        },
        tooltip: {
          backgroundColor: theme.palette.common.black,
          fontFamily: 'Yekan'
        },
      }));
      
    
      function BootstrapTooltip(props) {
        const classe = useStylesBootstrap();
        return <Tooltip arrow classes={classe} {...props} />;
      }

      
    return (
        <PanelMain header={<PanelMainCategorieshead />}>
          <CategoriesAddModal showAddModal={this.state.openModal}
            removeInputsValue={this.state.removeInputsValue}
            hideAddModal={this.closeModal}
            buttonLoading={this.state.buttonLoading}
            errorOnAdd={this.state.errorOnAdd}
            handleButtonClick={(nodeName, nodeOrder) => this.createNodeHandler(nodeName, nodeOrder)} />

          <SubCategoryAddModal showSubAddModal={this.state.openSubModal}
            removeSubInputsValue={this.state.removeSubInputsValue}
            hideSubAddModal={this.closeSubModal}
            subBtnLoading={this.state.subBtnLoading}
            errorOnSubAdd={this.state.errorOnSubAdd}
            handleButtonClick={(nodeName, nodeOrder) => this.createSubNodeHandler(nodeName, nodeOrder)} />

            <CategoryDeleteDialog open={this.state.openDialog} handleClose={this.closeDialogHandler} handleDeleteNode={this.handleDeleteNode} 
            delButtonLoading={this.state.delButtonLoading}/>
          
          {
            this.state.loading ?
            <div className="d-flex justify-content-center">
              <div className="spinner-border d-block mr-2" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <strong className="d-block">در حال بارگیری</strong>
            </div>
            : null
          }

          {
            this.state.errorOnLoadData ? null :

            <div className="wrapper">

              <div className="categories-info-box" ></div>
              <div className="categories-info-box-insidebox">

              <div className="bar-wrapper"> 

                <div className="categorie-collexpand-box">

                  <BootstrapTooltip placement="top" title="اضافه کردن">
                    <div className="material-buttons categorie-material-compress-btn">
                      <FontAwesomeIcon icon={faPlus}
                      onClick={() => this.openModal()}
                      className="categorie-material-compress-icon-success" />
                    </div>
                  </BootstrapTooltip>

                  <div className="categorie-collexpand-box-right">
                    <BootstrapTooltip placement="top" title="باز کردن همه">
                      <div className="material-buttons categorie-material-compress-btn">
                        <FontAwesomeIcon icon={faExpand}
                          onClick={this.toggleNodeExpansion.bind(this, true)}
                          className="categorie-material-expand-icon" />
                      </div>
                    </BootstrapTooltip>

                    <BootstrapTooltip placement="top" title="بستن همه">
                      <div className="material-buttons categorie-material-compress-btn">
                        <FontAwesomeIcon icon={faCompress}
                        onClick={this.toggleNodeExpansion.bind(this, false)} className="categorie-material-compress-icon" />
                      </div>
                    </BootstrapTooltip>
                  </div>

                </div>

                <div className="categorie-search-and-child-keeper">
                  <div className="categorie-search-box-child">
                    <FontAwesomeIcon icon={faChevronCircleLeft} className="categorie-prev-icon text-primary categorie-prevNext-icon" 
                    onClick={this.selectPrevMatch}/>

                    <label className="text-secondary categorie-search-count">
                      {searchFocusIndex} / {searchFoundCount}
                    </label>

                    <FontAwesomeIcon icon={faChevronCircleRight} className="categorie-next-icon text-primary categorie-prevNext-icon"
                    onClick={this.selectNextMatch} />
                  </div>

                    <TextField
                    onChange={this.handleSearchOnChange}
                      className="categorie-search-input"
                      id="input-with-icon-textfield"
                      label=""
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

              </div>
                  
                
                {/* <PerfectScrollbar> */}
                <div className="tree-wrapper" style={{height: 400}}>

                {/* <PerfectScrollbar> */}

                    <SortableTree className="scrolable-tree-body"
                      treeData={treeData}
                      rowDirection="rtl"
                      canDrag={false}
                      onChange={this.handleTreeOnChange}
                      onMoveNode={({ node, treeIndex, path }) =>
                        global.console.debug(
                          'node:',
                          node,
                          'treeIndex:',
                          treeIndex,
                          'path:',
                          path
                        )
                      }
                      maxDepth={maxDepth}
                      searchQuery={searchString}
                      searchFocusOffset={searchFocusIndex}
                      searchFinishCallback={matches =>
                        this.setState({
                          searchFoundCount: matches.length,
                          searchFocusIndex:
                            matches.length > 0 ? searchFocusIndex % matches.length : 0,
                        })
                      }
                      isVirtualized
                      generateNodeProps={rowInfo => ({
                        buttons: [
                          <BootstrapTooltip placement="right" title="ویرایش">
                              <div>
                                  <button
                                  type="button"
                                  className="btn btn-link categorie-node-btns"
                                  onClick={() => alertNodeInfo(rowInfo)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} className="categorie-info-icon text-info" />
                                  </button>
                              </div>
                          </BootstrapTooltip>
                          ,
                          <BootstrapTooltip placement="right" title="افزودن">
                              <div>
                                  <button
                                  type="button"
                                  className="btn btn-link categorie-node-btns"
                                  onClick={() => this.openSubModalHandler(rowInfo)}
                                  >
                                    <FontAwesomeIcon icon={faPlus} className="categorie-plus-icon text-success" />
                                  </button>
                              </div>
                          </BootstrapTooltip>
                          ,
                          <BootstrapTooltip placement="right" title="حذف">
                              <div>
                                  <button
                                  type="button"
                                  className="btn btn-link categorie-node-btns"
                                  onClick={() => this.openDialogHandler(rowInfo)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="categorie-trash-icon text-danger" />
                                  </button>
                              </div>
                          </BootstrapTooltip>
                        ],
                        
                      })}
                    />
                    {/* </PerfectScrollbar> */}
                </div>
                {/* </PerfectScrollbar> */}
            </div>
          </div>
        }

        <ToastContainer autoClose={4000}
          position={toast.POSITION.BOTTOM_LEFT}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnVisibilityChange={false}
          pauseOnHover={false}
          rtl={true} />
     
      </PanelMain>
    );
  }
}


const mapState = state => {
  return {
    token: state.authReducer.token,
    categoryGuid: state.list.categoryGuid
  }
}

export default connect(mapState)(withRouter(Categories))