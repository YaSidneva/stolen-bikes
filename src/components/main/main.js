import { useState } from "react";
import css from './main.module.scss';
import { Button } from '../shared/buttons/button/button';
import Image from '../shared/images/yeti-stole-bike.jpg';
import { Modal } from "@mui/material";
import { AddReport } from "../TheftReport/TheftReport";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";

export const Main = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
    return (
        <main className={css.main}>
        <div className={css.description}>
          <div className={css.description_text}>
            Добро пожаловать на Yeti watch - онлайн-платформу, созданную для
            совместной борьбы с велосипедными кражами в крупных городах России.
            Мы, как компания, занимающаяся прокатом велосипедов, осознаем
            проблему, с которой сталкиваются наши клиенты - частые кражи
            имущества. Чтобы эффективно бороться с этим явлением, мы создали
            Yeti watch.<br /><br />
            Yeti watch - это платформа, где каждый человек может легко и быстро
            сообщить о случае кражи велосипеда. Вы можете заполнить информацию о
            происшествии, указав детали, такие как место и время кражи, описание
            велосипеда и любую другую полезную информацию. Эти данные будут
            использоваться для создания единого реестра краж и отслеживания их
            прогресса.<br /><br />
            Присоединяйтесь к Yeti watch и помогите защитить велосипеды наших
            городов. Вместе мы можем изменить ситуацию и улучшить безопасность
            для всех велосипедистов. Yeti watch - это глаза и уши наших городов
            в борьбе с кражами велосипедов.
          </div>
          <img className={css.description_img} src={Image} alt="yeti-stole-bike"/>
        </div>
        <Button className={css.add_theft} onClick={() => setOpen(true)}>Сообщить о краже</Button>

        <Modal
        className={css.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <div className={css.form_wrapper}>
        <ButtonModalClose onClick={() => setOpen(false)} />
          <AddReport />
        </div>
      </Modal>
      
      </main>
    )
}