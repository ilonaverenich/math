import {useState, useEffect, useRef} from 'react'
import { Input , message } from 'antd';
import emailjs from '@emailjs/browser';

function Email(props) {

const [email,setEmail] = useState('')
  const form = useRef();



  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.send('service_vyrw4lf', 'template_ea5t73w', props.templateParams,'5dc8crz-UKPrP6gfp').then((result) => {
     message.success('Письмо успешно отправлено на почту!')
  }, (error) => {
     message.error('Возникла ошибка!', error)
  });
    
  };

  return (
    <form className='form-submit'  ref={form}  onSubmit={sendEmail}>
          <p>Результаты можем отправить на вашу почту:</p>
          <div>
          <label> Введите <b> email </b> : </label>
          <Input type="email" className='inputEmail' onChange={(e)=>setEmail(e.target.value)} name="user_email" />
          <Input type="submit" className='btn-email' value="Отправить" />
          </div>
        
    </form>
  )
}

export default Email


