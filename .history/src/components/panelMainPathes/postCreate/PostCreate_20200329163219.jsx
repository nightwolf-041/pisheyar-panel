
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PanelMainPostCreatehead from '../../panelMain/panelMainHeads/PanelMainPostCreatehead'
import PanelMain from '../../panelMain/PanelMain'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { Editor } from '@tinymce/tinymce-react';
import {FormControlLabel, Switch} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './postCreate.css'
// import {Editor} from 'tinymce-react';

 class PostCreate extends React.Component {
   constructor(props) {
     super(props)
     this.state = {

      loaded: false,

      loading: true,
      errorMsg: null,

      preLoader: true,
      checked: false,

      title: '',
      abstract: '',
      description: ''
     }

   }

   errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
   errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
   successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});


   titleInputHandler = (e) => {
    this.setState( {title: e.target.value})
   }

   handleEditorChangeTop = (content, editor) => {
     this.setState( {abstract: content})
   }

   handleEditorChangeBott = (content, editor) => {
     this.setState( {description: content})
   }

   toggleChecked = () => {
     let oldchecked = this.state.checked
     this.setState({checked: !oldchecked})
   }


   sendDataHandler = () => {
     let titleValue = this.state.title
     let abstractValue = this.state.abstract
     let descriptionValue = this.state.description
     let checkValue = this.state.checked

     this.setState({
      loading: true,
    })

     axiosConfig.post('/Post/Create', {
      title: titleValue,
      abstract: abstractValue,
      description: descriptionValue,
      isShow: checkValue,
      categoriesIds: [2,3]
     }, {
      headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {

      this.setState({
        loading: false,
        errorMsg: res.data.message
      })

      this.successOnSending()

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
       <PanelMain header={<PanelMainPostCreatehead />}>
          {!this.state.loaded ? 
            <div className="d-flex justify-content-center">
              <div className="spinner-border d-block mr-2" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <strong className="d-block">در حال بارگیری</strong>
            </div>
            : null
          }

            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-3 mb-3">
                عنوان پست خود را بنویسید
              </h5>
              : null
            }


          {this.state.loaded ? 
            <input className="form-control top-input" defaultValue={this.state.title}
            onChange={(e) => this.titleInputHandler(e)} />
            : null
          }


            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-5 mb-3">
                توضیح مختصر پست خود را بنویسید
              </h5>
              :null 
            }
          
          
              <Editor
              apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
              initialValue=""
              outputFormat='html'
              init={{
                // selector: 'textarea local-upload',
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount directionality hr fullscreen casechange hr formatpainter ',
                  'save '
                ],
                toolbar:
                  'undo redo | fontselect  formatselect fontsizeselect | bold italic strikethrough | backcolor forecolor permanentpen \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help | image | link \
                  insertdatetime | table | ltr rtl | fullscreen | save | casechange \
                  hr | formatpainter ',

                images_upload_url: 'local',

                images_upload_handler: function (blobInfo, success, failure) {
                  setTimeout(function () {
                    success('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFhUWFxcXFxYVFxUVFRUVFxUXFhcVFRcYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0lHSYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMwA9wMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAIFAAEGBwj/xAA6EAABAwIDBgUCBQIGAwEAAAABAAIRAyEEEjEFIkFRYXEGE4GRobHBMkLR4fAjUgcUYnKS8RaC0hX/xAAaAQACAwEBAAAAAAAAAAAAAAABAgADBAUG/8QAKhEAAgICAgIBBAEEAwAAAAAAAAECEQMhEjEEE0EiMlFhFAWRwfEjQnH/2gAMAwEAAhEDEQA/APNsCQLFEx8GwSzCiFsrP8jXqiVGjZWNKmIS1HRGCRvZE6FnNg2RGLHNU2FQAZiOEBrkdjkjIM0SOKM5oKQ8xFY4peIDKlKDIVvgNpOAAlVmeVJojRR7QbPSvCOFznOu7psgLl/A9P8ApN7LrQFdhXyO3oVx+cU3mkAagaSwHQuiwXnWz/8AEaqH5K9Iaw62VzSLGR0XqELgPG/hdr8QytTgF4PmDmRGV/c3B7BDyXJLlFl/j8W+MkdF/wDv0nU/Ma4FvPl3Vd/5bSzRmCpMDsttIOEkhwgjgTzj0XGVDDiOAKzQzyn2DyMaxvR7ZgsUKgkFMkLzfw54hFMBrnaLqHeI2FsgrVDNrZRpl8VGFwWN8ZlrvwmFf7C8QMrAXumWYmi9LUMtRmmVpwVtgFnNQnhNOahOagQUe1Bc1OOagvaoQSe1Be1OvagPagQRe1YjPatqEPnVj0w16i1gRG00rFJU3lNtfZQpUwi5Qq2yGs62xa8tQDkaIOMKLZJ51KnVS8SByEemUFt0dtkGQIGFGphTokFHwuBqVHZabC49NB1J0A7qtsKV9Ha+FNuBoa024L0LDVw4SuA2L4dFEB1Uh7+AE5W//R+FdPrHmq15KgbIeNJrZ0WPxrabcxPbqVyj6z3vmC6Tc8APsnadccborKzdBbsFTmyvL80jTixev9srsS3W1wDZcPUwgBdMEyfqu9q0DnLjpHD69153tLF1BWe19iHERyHD4gqzCjN5XwLtpQ+BzXS4LBuDZhUWDIzBx5rucLiGlgiNFd8maCTZy1fBCo66MzCGgQ9hNtUPEVzTr9CVYYvFZmnsmCknZ12w9qh7RJursXXluxqlQOEG0r0vBv3RKshOtEqwpCCUUuSwfdM8gFE25qC5qaIQ3tVgBN7UB7U69qA9qhBF7FiM9qxQB830U/SCQovTDKqSSFDPlY1xWCpKnllKQn5lkAuUnUyEEIpC2HapsKixsolOkiSxmirjYmyxXeS92WmyC93KdAOpVTTbC7bYmEccPTDGyXBz4OhcSQC7sA1Z8smlovwY1OW+i/wOzcIwtptotJFw5284nmTx7aK4AYyzGNbJ0a0CTzMKj2dhpLHuEOY4j2EEhT8SbYFCiagBc64a0XJMTaFjk5N18nRjFLoYxO1WtflcRyjif0RX1AdF5HS2niaz2uL3veSCW+WG02TfK12sjrqvStiZyN8ylzYXj7ZbiyKa0PNeQBZU+0dr1KVUCmM7iDDZgSNS4wYEdF0ooAqr2l4ep1PxtnjI1CSCipJy6GluL49hNi7e84Fr2GnUaYI1bMAgh0XBDhy10XK+Pg3+m8NioXOaerWga9iV1uy8C2iMo0PQfZM7T8P0MS2Kjd6+Vw1Ex+ivhKKycl0ZssW8fH5PONgUvMMHRdpgsExkwuRx2FdgapZE8WuP5hzAFh2uuy2afMpgu4jgtT27RghGnT7KDxVUblAGspHA1JFySp+IMKGVLHVV7K+VG9aFlLZ0OAxTQ8Lutm44EaryVuMvZXWz9sOaktoMcn5PS6uKaAgUsQ2dV53jdvVCeiG3xA4DVHkN7EeqMqg6LHBcJsvxK0AFzo7rpcLtljwIKujl/IKT6LFwQHhYcSOaUr7SYOITexE4sJUCxIVdpsiZWIPKg8GfObURjkKVNgV9FA1TcmWVUpTCYAVckQM+rKWcwomREYUFoBmHR3vhRbUC2+lOiHyQ2MRZeneF6xdg6JaYDWkHmSHGQF5MaRBVzszH1G0zSa8sBOZrh+V8RfobKvPC43Ev8eajPZ6XQxTnPyjQcuv7KFagJJcM3fgOi5jwTtioa1SjiABUAL2EfmaNR3Fj27LqcTWB0XLlBwezrKfIHhcHTBLmtA6/urDDbgLikZJGVo3RqeZR8Y+GEHkk5OT2P0is2x4ypUTBcJOg+6qcP/iTTFRrXhxDjEgaTabm64XxHgAKrnbxvaIgcvRJYBzg60eoBI7EixXZhix8dI5csk+R9CUajX6fseSZpugdlw/hbbUiHn9f+l2NOuHzHMLm8eLZ0ZQnx5NaAeJ9isxTG5iWuabOEHXmOIXLOGJwjcrgHM0a8XHboV3FZ35ekpZzQ4ZXgFp1B0Kb2uLr4M8sEZq/k8q2nj3PdLikhUJXq+I2VhtDh6XfIPdUuO8K0HSaU03ctWe2oWiPk41oyy8PJVo4yiI1Rm4wTChtHC1WPNPI4kf2gkHqI4JduArzPlVP+Dv0V1KStmXi1qhzEV5CSFdNnDPA3mOHdpH1SbsNxCEeJHZs1FcbIx7maFUholFwxIKLoKOvxG3TEBUWKx7nauKG50hKV00IqguTZlTaj22BWKoxD7rErQts50I7QgNajtK1MgVpRqbkuCpsKRohYUxKytTsgtqLH1UiWwEaNO6tMOVWUn3T9AypMhPEwoUSt1qJK3QoQl1QCw2dislSm8/kOvENNnR6E2XVuxGmWI4ciOELiC68LpfD1I5X6k0h5kcGibg8+Jjp6LJ5GO1yRs8bM74ss6eKcw5nWYL/AM9YU9p7RaWAtdFr30sPiPqlC5z84P4YOXmLfrdeXV2VmFxdfKTJ1NjoY9YlVePhWS99GvJkcWXO18VmecsuM8O8Lp/CPhJtfDVq7w7zGZmtYOeQOaeuvwq+hg2tFgJgE24ldF4O2qKGIbnMMfuOvYEkZXHoD9StCyf9TuP+j8MDydzW6/wVeBp+Xp9V0OA2gWuBF/0SfifACjiHNH4Xb7eziZHoZ+FWisWoJ1o6/CHkY1JdNHo1GtmJcNDop1Gqp2BXzUWnjJ+quAbLFNU2jzGaHrm4/gDiDLQeVkNrUxQZmaQlmdVWKmGw1XKS3mo4rHAcYUqzJEjgue8Uz5XmMMFp3gOLTafSydNv6SudJci2fjxxM9wq+vg8NU/E0Tzbun4XGHaj/wC4rbNuubYn1+xVvpyoz+/DPTLrHeFpM0ao/wBr/wBQqKvs+pSdFRsddQexVjS8QWTR2yx4yvgg8D/NU0c04/chZeNjl9jKYBJYt0BWWLoEbzd5nA/YqlxlRb41JWmYJxcXTK+s5aQqgusTUJYr5MJeoU4QSl6mGKeH7CDplMMaoNpEKbAVYyBC5SY2USlSlMU6SrboDA0qScpthaDUQNSN2AJSMopah0U7SEqmTCV7XQ7rw6de673wPTinUdGpDfYT9wuTrYTiu78N4by8Gw8XFz/cwPgBU55co6NHir/kKLFVG0KvkjdIGanOj2Sd0dW3EaxCp9rYVocaoAyP/GDGvEFdh4j2HRq0ZrF0tu1zSGlrjyJBgacDpoVw1B72w03oPJABcXuILjv5ovYKKDx1P5/B0J/S+LC4kw0ZQS0tsZ1AhJNqTYk36JrGxQBaZc0Gwv8Ah4ZToB/ISOHxFAONU1HENMilABLrQM1weHJSUfldHo8P9Wh60pfd+DtvHmJaaWHaJzaybkMDADmPct9iuXw9UnW6QxGNq4moajp0gNBs1qvfD2zt4PdwuBrdVzdbZZ4maPj4EpP8v+522wKIp02jiRJ7m/3VtwKrMC4cfurNullmvls4OabnNyfyEw7Y9ik3OAPNMvfDZVfmlCT6Ej2NB9pVPjrtezUFrh7jVWLXlJHDBznEoXtBr4PKBiCovMo+0MIadV7D+VxHpNj7QgOau8qatHAap0bAjRGZjLIFK6k+glkl8k2uhyltB0RNuXBL4gpjZ2zs1yj7S2flFkONdDW32UlRYgVHFYmoUPTwr+SYbgXcl2dPAtTNPAtWR+SW8DhnbNdyUBsp/wDavQ2YBqOzAt5JV5TQfWect2XV/tTVLZNTkvQm4JvJGZg2oPymwes88bsaryRDsWryXozcK1EbhWofyJB9SPOaWwqvFWOG2K8Ltv8ALBbFEJZZ5MnrRyo2U5dOyKVNjHflY2wBJJ1IACM2kEntKtvEqr2VtmnxopOyl8W7UFSkaXlnKS0vzEXDSHZWwTrEE99VzDXOqEuc0A8ImzR+VvIKz2w4OOUH7JaiwAcNO6Mssp7ZqnUnsB5wLfLfcHQcR2/RK0djUpJvBIMTExobd/lPspNLS6YMxHIfutVbCQVE2umBVdiG0K34W0wGAf29CRfmecq42PirAcVQ1+Slgqrmm0ozjyiWLI72ehYKqr7DVVx2yMXm1XRYeqsq0yySss8UN08tVUl3JWjnzTPZUdUmfVGfYsRtjlpmpHVQw7lqgOJQIc34k2AX1y9pgOAJ7gR9gqo+G3c16BUiUFzRyWyHkyUUjmZsa5s4J3h1w4qI2K9d09oS72BN/KkVetHL4TCOYo4yk5y6GoByS72jkm/ksbgcVidklbXVVWBYn/kMX1odpphjlX0nFNUhKxNDjjHIqALIrHJGgDNJHaUrTCapNuikyUSaUZpQ/LvZEFEqJMNMmsAUdFN7OKOyGw1U+2KBdmjlburplOyTxjbHspJaNHjfcebbQe4Oh0SlcG0vcW9Fd7XwcEvM8+CpPD7jicUKTN0EOlwFwAJmO8KyCuOi7I+L2M4eiGlOOqD0R9qbIqUXQ+7To8aE8jyKqqpLZBHqh2CLVWiOIDSQZTNPDAtkQqWqUTZ2LLHQScp16dU7g60CM97On2Q4sIDmk9QuqpssCJVbgMPugm08uSuMKz25LJJ7Nq6G6X4Hdj9FTxxlXdBwBjn9FSYiq1hiRYkSbcYRaKm6Yw0EArdERwRBGTnPELWW0o0BOzYFlDKjUBKlVYjGNoxZvvYk9iA9qcc1Be6E3EqoQqtQXAJmqJlJulDaABqBYsrGAsRtkINCdoaKvoVeCLSro2iJosGVb3RQ5JtJKYD4VUpAseoPgKTavFKMxICIa0o3olljSxKkcQ4pGnVsjZ9FObJyD50bPZJVXwp03pee9g5DfnFBxBmT0US6VEuke6b2Xo0ePK5nLeJzlpOPT6qq/wAM8LGIqPP5acf8nD9Fe+JKOZhHZB8G4fJ5zv8AaPqfurVPjjZd5C1Z1tbK9pY8AtOoXEeIdiPpSWy6meOpHR36rsaTjF1J5myq9mrMkclHj7wUzsrBGrUaxupPsOJXU+Itk0bua3KeMWB9EfwxsryWGo4b7xb/AEs4ep19le8q42bI4W5UXDGAQ0aAADsLJ/DiEnRbJT9JqyLbNstKibnQF5n/AIgUavn58xyHeaOAPH1/Vej1brmfGtOaGl82quxz4zRz8uS5cUL+GdpOdSa0m4suppPlq892DUyuhdlSxFhCORUy+HRYsqACVGpW4pSpqtHRJDI6MU53Jk6+IlLmqtEGECuOSVyldldhatdJVKsqLzzQXmQSp7XLSI2DxD1iXqLE1sTZlF2kJumRfqkMNomGugxxi3VUOUkiFhTq8FMPm6XAFuZElGpuED57pZzfHZLJYecxB5Ir+IGsKWFEgO4kAkenDoiVIsUMuVx0iVomzQDpdEpvlCAB4ojKRAkKKTkxaGGCSsDkJtQgT6FbbU4IclxtED0ON0RosP8Ad9kBrgD6I1KsIMHT6qzGqZo8ZVkK3a1OQUhg9pUsPIq7oeZDhe4GhVniHyqfa2y2VwGuJABBlsTbv6rRGm6fR0ckOUaL3DV21WhzHSEdjZVfszDCnmAmCArTyhAVEo/VSOVPHxlSKh+FzVCXDcBmDxP6Jpu8eimRIRsME1Nnah9Md9hKNNTfUyqTKkWVdXqSYOh0Ub4qzN5Obiglar8yltp4cVKRYdSLd+CnThzh0+qO2mM0uuAlg29nOim2vyeb08zXwbEGF1WCrAxPRc34irBtZ0c1ZeH6NV48x4Ib+Xr1WrIvps3Kah2dLUqAzzUA9apDdNuCE0GZOkLLuzntu7JmoNCla9WFJzt4oFY3RbJYKo9AfU4cJW6jjp7JdzkMdJksiavwtJes6/wsWvQGzeeBzTGFqA5TpHOUmDumOi1nIb3t269VVLGCy18zS/T3KL5gb7EjukaRhzJiJueymxwkwZGkj7eqSOHW/kZrRbsrwwBtjEEpsV2lvyqChXdpBj1m2tk2ySN0E8bGepBSTxySVA5MtaJBIHwjPr/HDoqsuIOluBn2Cdw72zE2I7ySYF7QNL9dFIQb09DQV6GK9KpT3nNIa7nz7aixUXOOo5DsOKK9pdnax4cdC3i6IcQJ0IjXoq/EtqNO+0tiYbwiB6cRx7pZ4XDq6JOPEbr1hbelLYmuGMsYvPc2n7KNemxoLvNbma0HLaOoF+HZVeJpGoTSc4ueQHANFxLA4xHKdY4IrFJSTDjm8c02grNqtFiUenjMxsJAjouXxmBq03VCAd3KG5ZGYE5Rm7Bs+y6LZ+yqx/rZdxzQQLWIZJJbrlgtPY9FreOlo2ryostcG6JOotHaL91YUqk3m0fKpsDjG1S1u9AP5fxG0fzlKvKdANaARB1ImbnhKzuFvkUYl7MnJ9Ghop07KQahV6oYJKJ0m9bI4irDgBxv6JHDOh287iSB+6lQxtIh5qNl5dAG9utA4ZddXfCWxNVnmE09CBrPLS99fommkoqRzs8lLY4KskxYk+6Dj6j4MWg3m0wLwkg9xIdcCD8cVvEPs5g5RPXUquNurKsTqSs5nA0fNqZ3jNBdaOUET7/C6su3QJiwiNBbRV2zMN5YMjqTHUhHdWh3SeHL9VZklbou8hriv/RttXT6LDUEd+EpH/MgQWl1y4bwF9III/lktUxJHqqFcZa/0ZboNVrQ/uPof3WnVgZjt68Es9wceMoIcQ+5txH3VlO9gYStUv8AX2S4qardV0OM85CUe6ACbXI+R+hTuPRCb3DMVpK1Kkn1WKxQAHc+Lt5z94+yi1/4Z0mfXVZRLeh5jgpBjCYlw5aGO6ulHkTiFfYC+v8ALrVNwcQDoeHUA37XRHDd4GAPbgsZSdDY4mB0B4pHBWGgtBzmO1BuDPSNPhPYeoWlzbSb5r6Wt3n6BIvG9IOkQDrbjfRGw5I1/nqllSVIi0NPxI0NxB/7RqmIDWgRJcd0dQIt8quxGIYXUzES+DF5ktBdf/2sm3OM5o3ogDX+XQapEdrQ9h8S9jYEFziA4mdCDJ15A+yiaweQ0OmM2snoDyvE9lrDsiC8RDgbyHAbwm+up91LH0B+Nhsf4DCkl9NMNtKmDOHPpoe99fdBNMsql7LF5Icf9MgxJ6hGfIIMxa/dCqPBMzblNp4ieCpr4QrqgXmZ58ySBADm/ia3gNLwS736q6ZiyxjS0kktAaJuT29DoVWUqQdLpIAGnPuOITQxbA1kCZs3uNddFZGX7GhJof8AD2yHU25zBJAImZANyD1VriMO7LmKp8Ntp5IZHO8WsYTtbGQ3fdA5Kz6GaYSqOnoJh67CSM15sPQKv28+MoiQTeOBStF7TlM7zpsJkRz9lt9CqXbzTlOrrzPXoqeLJPM3GmL0aJbUkixF/pHxKnVqU3xFnakEQS240/mqNWpTm3otHETpGijRw7ab3ZwDlgS06iJ+5SXUd/kpulxoew2EBbvboDbQJm959D8JTG0WNa12YETHXuY4adddU27HsLCW9QREEjl2VFtWoHtAYNAc3U/ljrdaJUlSGm6jd7Gi/K0CJMT3uSAkn1o4W+Oy06qc7WR+XlN4+OCzGuaLEGLuBubTIuNY5KlRtWVXJr9AWkGw01HQ9e1goVgYB53+/wB1JlQC8ch0IPEeiyvU0jt6c+6KiDTB1G6dbT8oNcGZ1sPiVv8AzIBAdMSQPbX2UXG45eqPHRAVd4hpg6ReB6mUDFszRNo+SUxUdzieSCHyQJFzpGisUbIBDA0d1ihWeO30WJ+LFAU3QQOc+nJNZh1SaNmT1WwjTSYj+FN4auRabgWm+vRIMebLKdU5lVJDJ0Nh+8SdfcI1FxdYA6+5S/I9VZYKg0BxGsTPXokpt8vwBK2QbRyjKdZ6cE1hwQ4FpIj+e6ScbdysxNQ5ddIQxS5vkRNIt/PJEPveQTr2UcPU1aT+wSGzTm15pxzRrxUyyajYzfIm6jOh978/ZKYuiLR1kE2dbjyPVFfUKHiG29Qli12IWGztmPa1zjfNJjgZNviFGphiWgPcA4b2gA55QNBGnsnm4lwAaDYKOK3iAeSsWOPJtDuKSs1g67WEg3MomIxDHtLTr8pOiNe4Hop4iqTGnL2SqegqTUaGNkN/qtiANb3JhWW28c5saQbW4LnqrocHCxEfJumsudwzXQjlajxXyROloA8tLxBtGpRq7wIiDJ+qrKrB5jh1lHJ3AexVObuK/ZOeqC02fiHWyVFGHS6xJTDXGPVBqtBcCdZVsVaYlaA4jGwXRrcGErTrZgL6D5KFiXbzxzJWUKYAAHFoKamlSFTfROo7VDc6BfkR8qdY6d0LHm0oVRBTGumDyRKVWR6pauYy9VjXQSrktEMxFTestUIkHjMduMoLjdaB3SmXYUCqvcRw1PtKxapLFYidn//Z');
                  }, 2000);
                },
                  
                  setup: (editor) => {
                  editor.on("init", () => {
                    console.log('initialized')
                  {
                    this.setState({loaded: true, loading: false})
                  }
                  })
                }
                
              }}
              onEditorChange={this.handleEditorChangeTop}
            />

            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-5 mb-3">
                محتویات پست خود را بنویسید
              </h5>
              : null 
            }

            <Editor
              apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
              initialValue=""
              outputFormat='html'
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount directionality hr fullscreen casechange hr formatpainter ',
                  'save '
                ],
                toolbar:
                  'undo redo | fontselect  formatselect fontsizeselect | bold italic strikethrough | backcolor forecolor permanentpen \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help | image | link \
                  insertdatetime | table | ltr rtl | fullscreen | save | casechange \
                  hr | formatpainter ',

              }}
              onEditorChange={this.handleEditorChangeBott}
            />

            {this.state.loaded ? 
              <FormControlLabel
                  control={<Switch checked={this.state.checked} onChange={this.toggleChecked} />}
                  label="قابلیت نمایش"
                />
                : null
            }

            <button className="btn btn-block btn-primary tiny-send-button"
            disabled={this.state.loading}
            onClick={this.sendDataHandler}>
              {this.state.loading ? 'صبور باشید'
                : 'ارسال'
              }
            </button>

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
     token: state.authReducer.token
   }
 }

 export default connect(mapState)(withRouter(PostCreate));


