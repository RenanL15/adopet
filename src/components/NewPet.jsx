import { PiCat, PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";
import { FaDog } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { PiDog } from "react-icons/pi";

export default function NewPet({ setNewPet }) {
  const [renderedPicture, setRenderedPicture] = useState(null);
  const [picture, setPicture] = useState(null);
  const [gender, setGender] = useState("");
  const [pet, setPet] = useState("");
  // const [castrado, setCastrado] = useState("");
  const { register, handleSubmit } = useForm();
  const idUser = localStorage.getItem("id_user");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/pet/registrar", {
        id_user: idUser,
        name_pet: data.name,
        tipo: pet,
        gender: gender,
        raca: data.raca,
        porte: data.porte,
        castrado: data.castrado,
        image: renderedPicture,
      })
      .then((res) => {
        console.log(res);
        setNewPet(false);
        document.body.style.overflow = "visible";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPicture(URL.createObjectURL(file));
    console.log(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      console.log(base64);
      setRenderedPicture(base64);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="fixed flex items-center justify-center w-full min-h-screen bg-[rgba(0,0,0,0.2)]">
      <div className="relative flex flex-col items-center gap-6 px-20 py-10 mt-12 bg-white rounded-lg animate-zoomIn max-h-[80vh] overflow-y-scroll">
        <button
          onClick={() => {
            setNewPet(false);
            document.body.style.overflow = "visible";
          }}
          className="absolute right-2 top-2">
          <IoCloseOutline size={40} />
        </button>
        <div className="flex items-center gap-2 text-3xl font-bold">
          <FaDog size={40} />
          <h1>Cadastre um pet</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative grid grid-cols-2 gap-6 text-xl place-items-center">
          <div className="col-span-2">
            <label
              htmlFor="img_upload"
              className="self-center my-5 rounded-full cursor-pointer">
              <img
                src={picture || null}
                className={`m-auto nt-12 border w-36 h-36 rounded-full border-black`}
              />
              {picture === null && (
                <PiDog size={50} className="absolute top-12 left-[15.5rem]" />
              )}
            </label>
            <input
              onChange={handleImageUpload}
              type="file"
              id="img_upload"
              className="hidden"
            />
          </div>
          <div className="flex flex-col w-full col-span-2 gap-2 font-semibold">
            <label htmlFor="">Nome do pet</label>
            <input
              type="text"
              {...register("name")}
              placeholder=""
              className="p-2 border border-neutral-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Pet</h1>
            <div className="flex gap-2">
              <button onClick={() => setPet("Cachorro")} type="button">
                <div
                  className={`flex items-center gap-2 px-4 py-1 text-xl text-slate-600 border border-slate-600 ${
                    pet === "Cachorro" &&
                    "!text-white !bg-slate-600 !font-semibold"
                  } hover:bg-slate-100`}>
                  <PiDog size={20} />
                  <span className="m-auto">Cachorro</span>
                </div>
              </button>
              <button onClick={() => setPet("Gato")} type="button">
                <div
                  className={`flex items-center gap-2 px-4 py-1 text-xl text-slate-600 border border-slate-600 ${
                    pet === "Gato" && "!text-white !bg-slate-600 !font-semibold"
                  } hover:bg-slate-100`}>
                  <PiCat size={20} />
                  <span className="m-auto">Gato</span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Sexo do pet</h1>
            <div className="flex gap-2">
              <button onClick={() => setGender("Macho")} type="button">
                <div
                  className={`flex items-center px-4 py-1 text-xl text-blue-600 border border-blue-600 ${
                    gender === "Macho" &&
                    "!text-white !bg-blue-600 !font-semibold"
                  } hover:bg-blue-50`}>
                  <PiGenderMaleBold size={20} />
                  <span className="m-auto">Macho</span>
                </div>
              </button>
              <button onClick={() => setGender("Fêmea")} type="button">
                <div
                  className={`flex items-center px-4 py-1 text-xl text-pink-600 border border-pink-600 ${
                    gender === "Fêmea" &&
                    "!text-white !bg-pink-500 !font-semibold"
                  } hover:bg-pink-50`}>
                  <PiGenderFemaleBold size={20} />
                  <span className="m-auto">Fêmea</span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 font-semibold">
            <label htmlFor="">Raça</label>
            <input
              type="text"
              {...register("raca")}
              placeholder=""
              className="p-2 border border-neutral-300"
            />
          </div>
          <div className="flex flex-col gap-2 font-semibold">
            <label htmlFor="">Porte</label>
            <input
              type="text"
              {...register("porte")}
              placeholder=""
              className="p-2 border border-neutral-300"
            />
          </div>
          <div className="self-center col-span-2">
            <h1 className="font-semibold">O pet foi castrado?</h1>
            <div className="flex gap-2">
              <label
                htmlFor="yes"
                className="flex items-center gap-2 mr-2 cursor-pointer">
                Sim
                <input
                  type="radio"
                  {...register("castrado")}
                  value="Sim"
                  id="yes"
                  className="w-5 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer caret-slate-600 checked:bg-yellow-500"
                />
              </label>
              <label
                htmlFor="no"
                className="flex items-center gap-2 mr-2 cursor-pointer">
                Não
                <input
                  type="radio"
                  {...register("castrado")}
                  value="Não"
                  id="no"
                  className="w-5 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer caret-slate-600 checked:bg-yellow-500"
                />
              </label>
            </div>
          </div>
          <button className="w-full col-span-2 py-2 bg-yellow-400 hover:bg-yellow-500">
            Cadastrar pet
          </button>
        </form>
      </div>
    </div>
  );
}
