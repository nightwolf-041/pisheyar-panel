
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PanelMainCategorieshead from '../../panelMain/panelMainHeads/PanelMainCategorieshead'
import PanelMain from '../../panelMain/PanelMain'
import PerfectScrollbar from 'react-perfect-scrollbar'
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

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

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

      files: [],
      documentGuid: '',

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

    if(this.props.history.state !== 'showCtegory'){
      this.props.history.replace('/categoriesList')
    } else{

    this.setState({
      loading: true
    })
    
    let guid = this.props.categoryGuid
    axiosConfig.get('/Category/' + guid, {
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
        axiosConfig.get('/Category/' + this.props.categoryGuid, {
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
            axiosConfig.get('/Category/' + this.props.categoryGuid, {
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
        axiosConfig.get('/Category/' + this.props.categoryGuid, {
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

              <div className="categories-info-box">
              <PerfectScrollbar>

              <FilePond ref={ref => this.pond = ref}
                files={this.state.files}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
                onprocessfile={(error, file) => this.setState({documentGuid: file.serverId})}
                onupdatefiles={(fileItems) => {
                    this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                    });
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>
              <FilePond ref={ref => this.pond = ref}
                files={this.state.files}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
                onprocessfile={(error, file) => this.setState({documentGuid: file.serverId})}
                onupdatefiles={(fileItems) => {
                    this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                    });
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>
              <FilePond ref={ref => this.pond = ref}
                files={this.state.files}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
                onprocessfile={(error, file) => this.setState({documentGuid: file.serverId})}
                onupdatefiles={(fileItems) => {
                    this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                    });
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>
              <FilePond ref={ref => this.pond = ref}
                files={this.state.files}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
                onprocessfile={(error, file) => this.setState({documentGuid: file.serverId})}
                onupdatefiles={(fileItems) => {
                    this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                    });
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>

              <CKEditor
            editor={ClassicEditor}
            config={
              
              {
                plugins: [Undo, RemoveFormat, Essentials, Bold, Italic, Underline, ParagraphButtonUI, HeadingButtonsUI, HorizontalLine, Paragraph, Blockquote,  SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersMathematical,
                Heading, Alignment, Indent, IndentBlock, PasteFromOffice, Highlight, Font, FontSize, list, Table, TableToolbar, TableProperties, TableCellProperties, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, Link , EasyImage, SimpleUploadAdapter, MediaEmbed, Clipboard ],
                
                  toolbar: this.resToolbar,

                  image: {
                    label: 'عکس',
                    toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                    styles: [
                      'full',
                      'alignLeft',
                      'alignRight'
                    ]
                  },

                  highlight: {
                    options: [
                        {
                            model: 'greenMarker',
                            class: 'marker-green',
                            title: 'نشانگر سبز',
                            color: 'rgba(116, 226, 122, 0.459)',
                            type: 'marker'
                        },
                        {
                            model: 'redMarker',
                            class: 'marker-red',
                            title: 'نشانگر قرمز',
                            color: '#f7534775',
                            type: 'marker'
                        },
                        {
                            model: 'yellowMarker',
                            class: 'marker-yellow',
                            title: 'نشانگر زرد',
                            color: 'rgba(255, 233, 36, 0.459)',
                            type: 'marker'
                        },
                        {
                            model: 'blueMarker',
                            class: 'marker-blue',
                            title: 'نشانگر آبی',
                            color: "#BBDEFB",
                            type: 'marker'
                        },
                        {
                            model: 'greyMarker',
                            class: 'marker-grey',
                            title: 'نشانگر خاکستری',
                            color: "rgba(204, 204, 204, 0.726)",
                            type: 'marker'
                        },
                    ]
                },

                  heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    ]
                  },

                  fontSize: {
                    options: [
                      'tiny',
                      'small',
                      'big',
                      'default',
                      14,
                      19
                    ]
                },

                  fontColor: {
                    colors: [
                        {
                            color: 'hsl(0, 0%, 0%)',
                            label: 'مشکی'
                        },
                        {
                            color: 'hsl(0, 0%, 30%)',
                            label: 'خاکستری تیره'
                        },
                        {
                          color: '#868e96 ',
                          label: 'خاکستری BS'
                        },
                        {
                            color: 'hsl(0, 0%, 60%)',
                            label: 'خاکستری'
                        },
                        {
                            color: 'hsl(0, 0%, 90%)',
                            label: 'خاکستری روشن'
                        },
                        {
                            color: 'hsl(0, 0%, 100%)',
                            label: 'سفید',
                            hasBorder: true
                        },
                        {
                          color: '#f44336',
                          label: 'قرمز'
                        },
                        {
                          color: '#03A9F4',
                          label: 'آبی'
                        },
                        {
                          color: '#4CAF50',
                          label: 'سبز'
                        },
                        {
                          color: '#FFEB3B',
                          label: 'زرد'
                        },
                    ],
                    columns: 5
                },

                fontBackgroundColor: {
                    colors: [
                        {
                            color: '#0275d8',
                            label: 'اقدامات'
                        },
                        {
                            color: '#5cb85c',
                            label: 'موفقیت'
                        },
                        {
                            color: '#5bc0de',
                            label: 'اطلاعات'
                        },
                        {
                            color: '#ffc107 ',
                            label: 'هشدار'
                        },
                        {
                            color: '#d9534f',
                            label: 'اخطار'
                        },
                        {
                            color: '#292b2c',
                            label: 'معکوس'
                        },
                        {
                          color: 'hsl(0, 0%, 30%)',
                          label: 'خاکستری تیره'
                        },
                        {
                            color: '#868e96',
                            label: 'خاکستری BS'
                        },
                    ],
                    columns: 4
                },

                table: {
                  contentToolbar: [
                      'tableColumn', 'tableRow', 'mergeTableCells',
                      'tableProperties', 'tableCellProperties'
                  ],
      
                  tableProperties: {
                      borderColors: customColorPalette,
                      backgroundColors: customColorPalette
                  },
      
                  tableCellProperties: {
                      borderColors: customColorPalette,
                      backgroundColors: customColorPalette
                  }
                },


                  language: {
                    ui: 'fa',
        
                    content: 'fa'
                  },
                  placeholder: 'پست خود را ایجاد کنید',

                  simpleUpload: {
                    uploadUrl: 'http://185.94.97.164/api/Uploader/CKEditor',
                    headers: {
                      'X-CSRF-TOKEN': 'CSFR-Token',
                      Authorization: 'Bearer <JSON Web Token>'
                      // Authorization: "Bearer " + this.props.token
                    }
                  }
              }
            }
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setState({description: data})
            }}
          />

              </PerfectScrollbar>
              </div>

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
            {/* </PerfectScrollbar> */}
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