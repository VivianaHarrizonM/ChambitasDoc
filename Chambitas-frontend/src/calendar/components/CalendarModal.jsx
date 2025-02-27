import { useState, useMemo, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { es } from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {
  
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavinGEvent } = useCalendarStore();
  const [ formSubmitted, setFormSubmitted ] = useState(false);

  const [formValues, setFormValues] = useState({
    title:'Vivian',
    notes:'Harrison',
    start: new Date(),
    end: addHours (new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';

    return( formValues.title.length > 0 )
    ? ''
    : 'is-invalid';

  }, [ formValues.title, formSubmitted ]);

useEffect( () => {
  if( activeEvent !== null ){
    setFormValues({ ...activeEvent })
  }
}, [activeEvent]);

  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal();
  }

  const onSubmit = async( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds( formValues.end, formValues.start);
    if ( isNaN( difference ) || difference <= 0 ){
      Swal.fire('Incorrect dates', 'Check dates entered', 'error')
      return;
    }
    if ( formValues.title.length  <= 0 ) return;

    console.log( formValues );

    // TODO:
    await startSavinGEvent( formValues );
    closeDateModal();
    setFormSubmitted(false);


  }
  

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={ 200 }
    >
      <h1> New event </h1>
<hr />
<form className="container" onSubmit={ onSubmit }>

    <div className="form-group mb-2">
        <label>start date and time</label>
        <DatePicker 
          selected={ formValues.start }
          onChange={(event) => onDateChanged( event, 'start') }
          className='from-control'
          dateFormat='Pp'
          showTimeSelect
          locale='es'
          timeCaption='hora'
        />
    </div>

    <div className="form-group mb-2">
        <label>end date and time</label>
        <DatePicker 
        minDate={ formValues.start }
          selected={ formValues.end }
          onChange={(event) => onDateChanged( event, 'end') }
          className='from-control'
          dateFormat='Pp'
          showTimeSelect
          locale='es'
          timeCaption='hora'
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Title and notes</label>
        <input 
            type="text" 
            className={`form-control ${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChange }
        />
        <small id="emailHelp" className="form-text text-muted">a small description</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChange }
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Additional Information</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> keep </span>
    </button>

</form>
    </Modal>
  )
}