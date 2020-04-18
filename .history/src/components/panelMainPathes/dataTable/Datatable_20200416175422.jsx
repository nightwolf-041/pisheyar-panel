// this file is table component of panel in /list route ... its use material ui table...some data come from DataTableControl

// import React from 'react';
// import {connect} from 'react-redux'
// import PanelMain from '../../panelMain/PanelMain'
// import MUIDataTable from "mui-datatables";
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import * as mainListActionCreators from '../../../storeConfigure/actionCreators/mainListActionCreators'
// import DatatableControl from './DatatableControl'
// import axios from 'axios'

// import './dataTable.css'

// class DataTable extends React.Component {

//   constructor(props){
//     super(props) 
//     this.state = {
//       data: []
//     }
//   }


//     getMuiTheme = () => createMuiTheme({
//         overrides: {
//             MUITable: {
//                 root: {
//                     fontFamily: 'Yekan',
//                     direction: 'rtl'
//                   }
//             },
//             MUIDataTable: {
//                 tableRoot: {
//                     direction: 'rtl'
//                   }
//             },
//             MuiTableRow: {
//                 root: {
//                     fontFamily: 'Yekan',
//                     textAlign: 'right',
//                     height: '70px'
//                   }
//             },
//             MuiTableCell: {
//                 root: {
//                     textAlign: 'right'
//                 },
//                 head: {
//                     fontFamily: 'Yekan',
//                     textAlign: 'right'
//                 },
//                 body: {
//                     fontFamily: 'Yekan',
//                     textAlign: 'right'
//                   }
//             },
//             MuiTablePagination: {
//                 toolbar: {
//                     fontFamily: 'Yekan',
//                     direction: 'ltr'
//                   },
//                   caption:{
//                       fontFamily: 'Yekan'
//                   }
//             },
//             MUIDataTableHeadCell: {
//                 root: {
//                     fontFamily: 'Yekan'
//                   },
//                   fixedHeaderCommon: {
//                     zIndex: '2',
//                     position: 'relative'
//                   },
//                   sortAction: {
//                     fontFamily: 'Yekan'
//                   }
//             },
//           MUIDataTableBodyCell: {
//             root: {
//               backgroundColor: "#fff",
//               maxHeight: '100vh',
//               fontFamily: 'Yekan',
//               textAlign: 'right'
//             }
//           },
//           MuiPaperRoot: {
//             root: {
//                 height: 'auto',
//                 maxHeight: '100vh',
//                 fontFamily: 'Yekan'
//               },
//           },
//           MuiPaper: {
//             root: {
//                 fontFamily: 'Yekan'
//               },
//               elevation4:{
//                 boxShadow: 'none'
//             }
//           },
//           MuiPopover: {
//             root: {
//                 fontFamily: 'Yekan'
//               },
//               paper: {
//               }
//           },
//           MuiTypography: {
//             root: {
//                 fontFamily: 'Yekan',
//                 textAlign: 'right'
//               },
//             body: {
//                 fontFamily: 'Yekan'
//               },
//             body2MuiTableCell: {
//                 fontFamily: 'Yekan'
//               },
//             captoin: {
//                 fontFamily: 'Yekan'
//               },
//               colorInherit:{
//                   fontFamily: 'Yekan'
//               }
//           },
//           MUIDataTableFilter: {
//             root: {
//                 fontFamily: 'Yekan',
//                 direction: 'rtl'
//               },
//             title: {
//                 fontFamily: 'Yekan'
//               },
//               checkboxListTitle:{
//                   textAlign: 'right'
//               }
//           },
//           MuiListItemText: {
//               root: {
//                   direction: 'rtl'
//               },
//             primary: {
//                 fontFamily: 'Yekan'
//               }
//           },
//           MUIDataTableViewCol: {
//               root:{
//                 width: '100%',
//                 direction: 'rtl'
//               },
//             title: {
//                 fontFamily: 'Yekan'
//               },
//               responsiveScrollMaxHeight:{
//                 height: '100%',
//                 overflow: 'auto' ,
//                 maxHeight: '65vh' ,
//                 overflowXx: 'auto' ,
//               },
//               formControl:{
//                   marginRight: 0
//               }
//           },
//           MuiFormControl: {
//               root: {
//                   direction: 'rtl'
//               }
//           },
//           MuiFormControlLabel: {
//             label: {
//                 fontFamily: 'Yekan'
//               }
//           },
//           MuiInputBase: {
//             input: {
//                 fontFamily: 'Yekan',
//                 textAlign: 'right',
//                 direction: 'rtl'
//               }
//           },
//           MuiInput: {
//             input: {
//                 fontFamily: 'Yekan',
//                 direction: 'rtl'
//               }
//           },
//           MuiButton: {
//             label: {
//                 fontFamily: 'Yekan'
//               }
//           },
//           MuiFormLabel: {
//             root: {
//                 fontFamily: 'Yekan'
//               }
//           },
//           MUIDataTableBody: {
//             emptyTitle: {
//                 fontFamily: 'Yekan'
//               },
//               tableRoot: {
//                   direction: 'rtl'
//               }
//           },
//           MUIDataTableSelectCell: {
//             headerCell: {
//                 zIndex: '2',
//                 position: 'relative'
//               }
//           },
//           MuiTableSortLabel: {
//             icon: {
//                 marginTop: '12px',
//                 marginBottom: '12px'
//               }
//           },
//           MUIDataTableToolbar: {
//               icon: {
//                 fontFamily: 'Yekan'
//               },
//             filterPaper: {
//                 maxWidth: '250px'
//               },
//               formControl: {
//                   marginRight: 0
//               }
//           },
//           MuiButtonBase: {
//               root: {
//                   fontFamily: 'Yekan'
//               }
//           },
//           MuiIconButton: {
//               root: {
//                   fontFamily: 'Yekan'
//               }
//           }
//         }
//       })


//         getData = () => {
//           axios.get('http://185.88.176.227/api/Account/GetAll').then(res => {
//             console.log(res);
//             let data = res.data.users
//             data.map(d => {
//               d.control = <DatatableControl />
//             })

//             this.setState({data: data})
//           })
//         }

//         componentDidMount(){
//           this.getData()
//         }
        

//       render() {

//         const columns = [
//           {
//               name: "userName",
//               label: "نام",
//               options: {
//                   filter: true,
//                   sort: true,
//                   fontFamily: 'Yekan'
//               }
//           },
//           {
//               name: "userFamily",
//               label: "نام خانوادگی",
//               options: {
//                   filter: true,
//                   sort: true,
//               }
//           },
//           {
//               name: "userCreateDate",
//               label: "تاریخ عضویت",
//               options: {
//                   filter: false,
//                   sort: false,
//               }
//           },
//           {
//               name: "control",
//               label: "کنترل",
//               options: {
//                   filter: false,
//                   sort: false,
//               }
//           },
//       ];

//         const options = {
//           serverSide: true,

//             filterType: 'multiselect',
//             sortDirection: true,
//             responsive: 'scrollMaxHeight',
//             print: false,
//             download: false,
//             rowHover: true,
//             rowsPerPage: 15,
//             height: '100vh',
//             fontFamily: 'Yekan',
//             textLabels: {
//                 body: {
//                     noMatch: "متاسفانه موردی یافت نشد",
//                     toolTip: "مرتب سازی",
//                     columnHeaderTooltip: column => `مرتب سازی ${column.label}`,
//                     fontFamily: 'Yekan'
//                 },
//                 pagination: {
//                     next: "بعدی",
//                     previous: "قبلی",
//                     rowsPerPage: "",
//                     displayRows: "از",
//                     fontFamily: 'Yekan'
//                 },
//                 toolbar: {
//                     search: "سرچ",
//                     viewColumns: "مشاهده ستون ها",
//                     filterTable: "فیلتر جدول",
//                     fontFamily: 'Yekan'
//                 },
//                 filter: {
//                     all: "همه",
//                     title: "فیلتر ها",
//                     reset: "بارگذاری مجدد",
//                     fontFamily: 'Yekan'
//                 },
//                 viewColumns: {
//                     title: "نمایش ستون ها",
//                     titleAria: "نشان/مخفی کردن ستون های جدول",
//                     fontFamily: 'Yekan'
//                 },
//                 selectedRows: {
//                     text: "",
//                     delete: "حدف",
//                     deleteAria: "حذف ردیف انتخابی",
//                     fontFamily: 'Yekan'
//                 },
//             }
//         };

//           return (
//             <PanelMain>
//                 <div className="datatable-keeper">
//                     <MuiThemeProvider theme={this.getMuiTheme()}>
//                         <MUIDataTable data={this.state.data} columns={columns} options={options} />
//                     </MuiThemeProvider>
//                 </div>
//             </PanelMain>
//         );
//       }
// }

// const mapState = state => {
//     return{
//         showAddModal: state.list.showAddModal
//     }
// }

// const mapDispatch = dispatch => {
//     return{
//         onHideAddModal: () => dispatch(mainListActionCreators.hideAddModal())
//     }
// }

// export default connect(mapState, mapDispatch)(DataTable)



import React from "react";
import {connect} from 'react-redux'
import PanelMainListhead from '../../panelMain/panelMainHeads/PanelMainListhead'
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
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import PanelMain from '../../panelMain/PanelMain'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './dataTable.css'



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


class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      loading: false,
      errorMsg: null,

      columns: [
            {
              field: "userName",
              title: "نام",
                options: {
                    filter: true,
                    sort: true,
                    fontFamily: 'Yekan'
                }
            },
            {
              field: "userFamily",
              title: "نام خانوادگی",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
              field: "userCreateDate",
              title: "تاریخ عضویت",
              editable: 'never',
                options: {
                    filter: false,
                    sort: false,
                }
            },
        ],

      data: []
    };

      this.tableRef = React.createRef();
  }

  errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
  errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
  successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});


  componentDidMount(){
    this.setState({loading: true})
    

    axiosConfig.get('/Account/GetAll', {
      headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {

       let data = res.data.users
       this.setState({
         data: data,
         loading: false
        })

    }).catch(err => {

      this.setState({
        loading: false
      })

     this.errorOnCatch()
    })
  }

  render() {
    
    return (
      <>
      {/* <PanelMainListhead /> */}
      <PanelMain header={<PanelMainListhead />}>
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
                placeholder: "سرستون را اینجا بکشید",
                groupedBy: "دسته بندی با"
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
            title="لیست گروه ها"
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    this.setState(prevState => {
                      axiosConfig
                        .post("/Account/GetAll", {
                          userName: newData.userName,
                          userFamily: newData.userFamily
                        }, {
                          headers: { Authorization: "Bearer " + this.props.token }
                      })
                        .then(({ data }) => {})
                        .catch(function(error) {
                          console.log("error:create Group -", error);
                        });

                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              // onRowUpdate: (newData, oldData) =>
              //   new Promise(resolve => {
              //     setTimeout(() => {
              //       resolve();
              //       if (oldData) {
              //         this.setState(prevState => {
              //           axiosConfig
              //             .patch("/Account/GetAll/" + oldData.chatroomId, {
              //               title: newData.title
              //             }, {
              //               headers: { Authorization: "Bearer " + this.props.token }
              //           })
              //             .then(({ data }) => {})
              //             .catch(function(error) {
              //               console.log("error:update group", error);
              //             });
              //           const data = [...prevState.data];
              //           data[data.indexOf(oldData)] = newData;
              //           return { ...prevState, data };
              //         });
              //       }
              //     }, 600);
              //   }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = this.state.data;
                      const index = data.indexOf(oldData);
                      data[index] = newData;
                      this.setState({ data }, () => resolve());
                    }
                    resolve()
                  }, 1000)
              }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    this.setState(prevState => {
                      axiosConfig
                        .post('/Account/Delete', oldData.userGuid, {
                          headers: { Authorization: "Bearer " + this.props.token }
                      })
                        .then(({ data }) => {})
                        .catch(function(error) {
                          console.log("error:delete group", error);
                        });
                        console.log(oldData.userGuid);
                        console.log([...prevState.data]);
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
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
    );
  }
}

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(DataTable)