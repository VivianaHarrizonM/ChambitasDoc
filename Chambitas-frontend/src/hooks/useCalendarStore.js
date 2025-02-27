import { useDispatch, useSelector } from "react-redux"
import {calendarApi} from '../api';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar);
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ));
  }

  const startSavinGEvent = async( calendarEvent ) => {

    try {
      if( calendarEvent.id){
        //actualizando
        const { data } = await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
        dispatch( onUpdateEvent({ ...calendarEvent, user }) );
        }

          //creando
        const { data } = await calendarApi.post('/events', calendarEvent );
      
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
        
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
    
    
  }

  const startDeletingEvent = async () => {
    //todo llegar al backend
    try {
      await calendarApi.delete(`/events/${ activeEvent.id}`);
      dispatch( onDeleteEvent() );
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }

  }

  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch( onLoadEvents( events) )

    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
      
    }
  }

  return {
    //*Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavinGEvent,
  }
}
