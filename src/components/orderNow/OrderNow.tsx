"use client";
import React, { useState } from "react";
import * as motion from "motion/react-client";
import BigSale from "../Header/BigSale";
import OrderInput from "./OrderInput";
import CheckboxGroup from "./Checkbox";
import RamainingProducts from "./RamainingProducts";
import emailjs from "@emailjs/browser";

type FormValueType = {
  Name: string;
  Phone: string;
  Addres: string;
};

const OrderNow = () => {
  const [formValue, setFormValue] = useState({
    Name: "",
    Phone: "",
    Addres: "",
  });
  const [formError, setFormError] = useState({
    Name: "",
    Phone: "",
    Addres: "",
  });

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormError((prev) => ({ ...prev, [name]: "" }));
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (formValue: FormValueType) => {
    emailjs
      .send(
        "service_3h92yrr",
        "template_a5l5sdf",
        { ...formValue, email: "tuuguu123123@gmail.com" },
        {
          publicKey: "M4Lbb7HyMtlTMYrKi",
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  const clickHandler = () => {
    let errorHave = false;
    const { Name, Phone, Addres } = formValue;
    if (!Name.trim()) {
      setFormError((prev) => ({
        ...prev,
        Name: "enter your  name",
      }));
      errorHave = true;
    }

    if (!Phone.trim()) {
      setFormError((prev) => ({
        ...prev,
        Phone: "enter your phone",
      }));
      errorHave = true;
    }

    if (!Addres.trim()) {
      setFormError((prev) => ({
        ...prev,
        Addres: "enter your addres",
      }));
      errorHave = true;
    }

    if (!errorHave) {
      sendEmail(formValue);
    }
  };

  return (
    <div
      id="hello"
      style={{
        backgroundImage:
          "url('https://w.ladicdn.com/s768x871/6513a52323c204001244ad79/3e271b097c955d6dcdef83b92a1e124f-20241008045232-2c0-i.jpg')",
      }}
      className="w-full h-[907px] flex flex-col items-center mb-5 scroll-smooth"
    >
      <div className="pt-6">
        <BigSale />
      </div>
      <div>
        <h3 className="text-[24px] font-bold uppercase text-center text-white mt-5">
          ЗАХИАЛГЫН МЭДЭЭЛЭЛ
        </h3>
        <div className="flex flex-col gap-5 mt-2">
          <OrderInput
            placeholder="ХҮЛЭЭН АВАГЧИЙН НЭР"
            name={"Name"}
            handlerChange={handlerChange}
            value={formValue.Name}
            error={formError.Name}
          />
          <OrderInput
            placeholder="УТАСНЫ ДУГААР"
            name={"Phone"}
            handlerChange={handlerChange}
            value={formValue.Phone}
            error={formError.Phone}
          />
          <OrderInput
            placeholder="ХҮРГЭЛТИЙН ХАЯГ"
            name={"Addres"}
            handlerChange={handlerChange}
            value={formValue.Addres}
            error={formError.Addres}
          />
        </div>
      </div>
      <div>
        <CheckboxGroup />
      </div>

      <motion.button
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
        onClick={clickHandler}
        className="text-[30px] font-bold text-white bg-red-600 rounded-lg p-[5px] mt-5"
      >
        Одоо худалдаж авах
      </motion.button>

      <div className="w-[400px] bg-orange-500 border-[2px] border-solid border-white rounded-[14px] flex gap-2 items-center justify-center mt-5">
        <img src="/baraa.svg" alt="" className="w-[25px] h-[25px]" />
        <div className="flex items-center">
          <p>Зөвхөн</p>
          <RamainingProducts />
          <p>бүтээгдэхүүн үлдсэн</p>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
