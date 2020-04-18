import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainPostsListhead from '../../panelMain/panelMainHeads/PanelMainPostsListhead'
import PanelMain from '../../panelMain/PanelMain'
import * as pagesActionCreators from '../../../storeConfigure/actionCreators/pagesActionCreators'
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Description from "@material-ui/icons/Description";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './postsList.css'


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


class PostsList extends React.Component{

    constructor(props){
        super(props)
        this.state = {

          loading: false,
          errorMsg: null,

            columns: [
                {
                  field: "postTitle",
                  title: "عنوان",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "userFullName",
                  title: "نام کاربر",
                    options: {
                        filter: true,
                        sort: true
                    }
                },
                {
                  field: "postViewCount",
                  title: "تعداد بازدید",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "postLikeCount",
                  title: "تعداد لایک",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "postModifyDate",
                  title: "تاریخ ویرایش",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "postIsShow",
                  title: "قابلیت نمایش",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
            ],
    
          data: []
        }

        this.tableRef = React.createRef();
    }

    errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
    errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
    successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});


    componentDidMount() {
      console.log(this.props.token);
        this.setState({loading: true})

        axiosConfig.get('/Post/GetAll', {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            this.setState({loading: false})

            let data = res.data.posts
            data.map(d => {
              if(d.postIsShow === true) {
                d.postIsShow = 'نمایش'
              } else {
                d.postIsShow = 'عدم نمایش'
              }
              return d.postIsShow
            })
            this.setState({
                data: res.data.posts
            })

        }).catch(err => {

          this.setState({
            loading: false,
            errorMsg: err.message
          })

         this.errorOnCatch()
        })
    }

    postDeleteHandler = (oldData) => {
      // axiosConfig.post('/Post/Delete/', oldData.postGuid, {
      //       headers: { Authorization: "Bearer " + this.props.token }
      //   }).then(res => {
      //     console.log(res.data);
      //     this.setState({data: res.data.post})
      //   }).catch(function(error) {
      //     console.log("error:delete group", error);
      //   });

        // axiosConfig.post('/Post/Delete/'+oldData.postGuid, {
        //   headers: { Authorization: "Bearer " + this.props.token }
        // }).then(res => {
        //   console.log(res.data);
        //   this.setState({data: res.data.post})
        // }).catch(function(error) {
        //   console.log("error:delete group", error);
        // });
        
    }


    render() {
        return (
            <>
            <PanelMain header={<PanelMainPostsListhead />}>
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
                <div style={{ width: "100%" }} dir="rtl">
                    <MaterialTable
                        style={{ margin: "20px", minWidth: "30%" }}
                        tableRef={this.tableRef}
                        localization={{
                        header: { actions: "کنترل" },
                        grouping: {
                          placeholder: "جهت دسته بندی سرستون را اینجا بکشید",
                          groupedBy: "دسته بندی براساس"
                        },
                        body: {
                            addTooltip: "افزودن",
                            deleteTooltip: "حذف",
                            editTooltip: "ویرایش",
                            emptyDataSourceMessage: "گروهی برای نمایش وجود ندارد",
                            editRow: {
                            deleteText: "از حذف این سطر اطمینان دارید؟"
                            }
                        },
                        toolbar: {
                            exportAriaLabel: "خروجی",
                            exportTitle: "خروجی",
                            exportName: "خروجی فرمت CSV",
                            searchTooltip: "جستجو",
                            searchPlaceholder: "جستجو"
                        },
                        pagination: {
                            nextTooltip: "صفحه بعد",
                            previousTooltip: "صفحه قبل",
                            firstTooltip: "صفحه اول",
                            lastTooltip: "صفحه آخر",
                            labelRowsSelect: "ردیف",
                            labelDisplayedRows: "{from}-{to} از {count}"
                        }
                        }}
                        options={{
                        grouping: true,
                        sorting: false,
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 30]
                        }}
                        icons={tableIcons}
                        title="لیست پست ها"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            {
                              icon: Description,
                              tooltip: 'مشاهده پست',
                              onClick: (event, rowData) => {
                                this.props.onSaveSinglePost(rowData.postGuid)
                                this.props.history.push('/singlePost' )
                                this.props.history.state = 'showSinglepost'
                            }
                            },
                            // {
                            //     icon: 'delete',
                            //     tooltip: 'Delete User',
                            //   }
                          ]}
                        editable={{
                        // onRowUpdate: (newData, oldData) =>
                        //     new Promise(resolve => {
                        //     setTimeout(() => {
                        //         resolve();
                        //         if (oldData) {
                        //         this.setState(prevState => {
                        //             axiosConfig
                        //             .patch("/Post/GetAll/" + oldData.chatroomId, {
                        //                 title: newData.title
                        //             }, {
                        //                 headers: { Authorization: "Bearer " + this.props.token }
                        //             })
                        //             .then(({ data }) => {})
                        //             .catch(function(error) {
                        //                 console.log("error:update group", error);
                        //             });
                        //             const data = [...prevState.data];
                        //             data[data.indexOf(oldData)] = newData;
                        //             return { ...prevState, data };
                        //         });
                        //         }
                        //     }, 600);
                        //     }),
                        onRowDelete: oldData =>
                          // this.postDeleteHandler(oldData)

                            // new Promise(resolve => {
                            // setTimeout(() => {
                            //     resolve();
                            //     this.setState(prevState => {
                            //     axiosConfig
                            //         .post('/Post/Delete/'+oldData.postGuid, {
                            //             headers: { Authorization: "Bearer " + this.props.token }
                            //         })
                            //         .then(({ data }) => {
                            //           this.setState({data: data})
                            //         })
                            //         .catch(function(error) {
                            //           // this.errorOnCatch()
                            //         console.log("error:delete group", error);
                            //         });
                            //         console.log(oldData.postGuid);
                            //         console.log([...prevState.data]);
                            //         const data = [...prevState.data];
                            //         data.splice(data.indexOf(oldData), 1);
                            //         return { ...prevState, data };
                            //     });
                            // }, 600);
                            // })
                            
                            new Promise((resolve, reject) => {
                              axiosConfig
                                .post(`/Post/Deletee/${oldData.postGuid}`, {
                                  guid: oldData.postGuid
                                }, {
                                  headers: { Authorization: "Bearer " + this.props.token }
                              }).then(() => {
                                
                                axiosConfig.get('/Post/GetAll', {
                                  headers: { Authorization: "Bearer " + this.props.token }
                                  }).then(res => {
                        
                                    resolve();
                                    let data = res.data.posts
                                    data.map(d => {
                                      if(d.postIsShow === true) {
                                        d.postIsShow = 'نمایش'
                                      } else {
                                        d.postIsShow = 'عدم نمایش'
                                      }
                                      return d.postIsShow
                                    })
                                    this.setState({
                                        data: res.data.posts
                                    })
                                    toast('پست با موفقیت حذف شد', {type: toast.TYPE.SUCCESS});

                                  }).catch(err => {
                                    resolve();

                                    this.setState(prevState => {
                                      const data = [...prevState.data];
                                      data.splice(data.indexOf(oldData), 1);
                                      return { ...prevState, data };
                                    })
                                    // toast('پست با موفقیت حذف شد', {type: toast.TYPE.SUCCESS});
                                    // reject()
                                    // toast('خطا در بارگیری مجدد لیست', {type: toast.TYPE.ERROR});
                                  })

                              }).catch(err => {
                                reject()
                                toast('خطا در حذف پست', {type: toast.TYPE.ERROR});
                              })
                              
                            })
                        }}
                    />
                </div>

                <ToastContainer autoClose={4000}
                  position={toast.POSITION.BOTTOM_LEFT}
                  hideProgressBar={false}
                  closeOnClick={true}
                  pauseOnVisibilityChange={false}
                  pauseOnHover={false}
                  rtl={true} />

            </PanelMain>
            </>
        )
    }
}


const mapState = state => {
    return {
      token: state.authReducer.token,
      postGuid: state.pages.postGuid
    }
}

const mapDispatch = dispatch => {
    return {
      onSaveSinglePost: (postGuid) => dispatch(pagesActionCreators.saveSinglePost(postGuid))
    }
}

export default connect(mapState, mapDispatch)(withRouter(PostsList))