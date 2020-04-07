import React from 'react'
import {withRouter} from 'react-router-dom'
import { history } from "react-router"
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainCategoryListhead from '../../panelMain/panelMainHeads/PanelMainCategoryListhead'
import PanelMain from '../../panelMain/PanelMain'
import * as mainListActionCreators from '../../../storeConfigure/actionCreators/mainListActionCreators'
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

import './categoriesList.css'


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


class CategoriesList extends React.Component{

    constructor(props){
        super(props)
        this.state = {

          loading: false,
          errorMsg: null,

            columns: [
                {
                  field: "title",
                  title: "عنوان",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "order",
                  title: "ترتیب",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
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
        this.setState({loading: true})

        axiosConfig.get('/Category/GetPrimaries', {
            headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res.data);
            this.setState({
                loading: false,
                data: res.data.primaryCategories
            })

        }).catch(err => {

          this.setState({
            loading: false,
            errorMsg: err.message
          })

         this.errorOnCatch()
        })
    }


    render() {
        return (
            <>
            <PanelMain header={<PanelMainCategoryListhead />}>
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
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 30]
                        }}
                        icons={tableIcons}
                        title="لیست دسته بندی ها"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            {
                              icon: Description,
                              tooltip: 'مشاهده دسته بندی',
                              onClick: (event, rowData) => {

                                // console.log(this.state.data.tableData);
                                // console.log(rowData);
                                history.pushState( 'showCategory', '/category')
                                // this.props.history.pushState( 'showCategory', '/category')
                                this.props.history.push({
                                  pathname: '/category',
                                  state: 'showCategory'
                                })

                                this.props.onSendCategoryTitle(rowData.title, rowData.guid)
                                // this.props.history.push('showPostEdit', '/postEdit')

                                

                                // return new Promise((resolve, reject) => {
                                //   this.props.onSaveSinglePost(rowData.postGuid)
                                // }).then( () => {
                                //   this.props.history.push('/singlePost')
                                // })
                            }
                            },
                            // {
                            //     icon: 'delete',
                            //     tooltip: 'Delete User',
                            //   }
                          ]}
                        editable={{
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
                  <p>pppppp</p>
                  <p>pppppp</p>
                  <p>pppppp</p>
                  <p>pppppp</p>
                  <p>pppppp</p>
                  <p>pppppp</p>

            </PanelMain>
            </>
        )
    }
}


const mapState = state => {
    return {
      token: state.authReducer.token,
    }
}

const mapDispatch = dispatch => {
    return {
        onSendCategoryTitle: (categoryTitle, categoryGuid) => dispatch(mainListActionCreators.sendCategoryTitle(categoryTitle, categoryGuid))
    }
}

export default connect(mapState, mapDispatch)(withRouter(CategoriesList))