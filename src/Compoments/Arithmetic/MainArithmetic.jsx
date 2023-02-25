import { Input, Radio, Space, Slider,Button  } from 'antd';
import { useNavigate } from "react-router-dom";

function MainArithmetic() {
    const navigate = useNavigate();
  return (
    <div className='page'>
        <div className='home'>
        <img onClick={()=>navigate('/main-page')} src="https://i.postimg.cc/Bvvf5zQd/icons8-50.png" alt="" />
        <img src="https://i.postimg.cc/gJ5zLsYv/icons8-50.png" alt="" />
      </div>
        <div className='page__content'>
        <div className='page__content_title'>Арифметические действия</div>
        <div>
        <div>Укажите:</div>
        <Radio.Group >
            <Space direction="vertical">
                <Radio value={1}>Целые числа</Radio>
                <Radio value={2}>Десятичные числа</Radio>
            </Space>
        </Radio.Group>
        <div>Диапазон значений:</div>
        <Slider
            range
            min={-100}
            max={100}
            step={5}
            defaultValue={[-10, 10]}
            /* onChange={} */
            /* onAfterChange={onAfterChange} *//>
        <div>Действие:</div>
        <div>
        <Radio.Group >
            <Space direction="vertical">
                <Radio value={3}>Сложение</Radio>
                <Radio value={4}>Вычитание</Radio>
                <Radio value={5}>Умножение</Radio>
                <Radio value={6}>Деление</Radio>
                <Radio value={7}>Все арифметические действия</Radio>
            </Space>
        </Radio.Group>
        </div>
             <Button>Начать</Button>
        </div>
   
        </div>
        

    </div>
  )
}

export default MainArithmetic