import { useEffect, useRef, useState } from "react";
import CardCar from "./CardCar";

const baseUrl = "https://cars-crud.academlo.tech";

const FetchApi = () => {
  const [carList, setCarList] = useState([]);
  const formRef = useRef(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [inputValues, setInputValues] = useState();

  console.log(inputValues);

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + "/cars/");
      const data = await response.json();
      setCarList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = ({
      brand: formRef.current.brand.value,
      model: formRef.current.model.value,
      year: formRef.current.year.value,
      color: formRef.current.color.value,
      price: formRef.current.price.value,
    });

    if(updateMode) {
      dataSend.id = inputValues.id
      updateCar(dataSend);
    }else {
      createData(dataSend);
    }


    //setInputValues(dataSend)
    formRef.current.reset();
  };

  const createData = async (dataObject) => {
    try {
      const response = await fetch(baseUrl + "/cars/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });
      const data = await response.json();
      setCarList([...carList, data]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(baseUrl + `/cars/${id}/`, {
        method: "DELETE",
      })
      if(response.ok) {
        console.log("car deleted")
        const newList = carList.filter((car) => {
          return car.id !== id
        })
        setCarList(newList)
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (car) => {
    setUpdateMode(true)
    formRef.current.brand.value = car.brand
    formRef.current.model.value = car.model
    formRef.current.year.value = car.year
    formRef.current.color.value = car.color
    formRef.current.price.value = car.price

    setInputValues(car)
  }


  const updateCar = async (dataSend) => {
    try {
      const response = await fetch(baseUrl + `/cars/${inputValues.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataSend)
      })
      if(response.ok) {
        console.log("Car updated")
        setUpdateMode(false)
        fetchData()
      }
    } catch (error) {
      console.error(error);
    }
  }




  useEffect(() => {
    fetchData();
  }, []);

  let background = updateMode ? "bg-blue-800" : "bg-green-800";

  return (
    <>
      <main className="min-h-screen w-full bg-[#30343e] text-white flex flex-col gap-12 items-center">
        <h2 className="text-2xl text-gray-300 underline" >Añade, modifica o elimina un coche!</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-7 bg-gray-900 h-[500px] w-[400px] grid justify-center items-center rounded-lg shadow-lg"
        >
          <label className="flex-col flex gap-2 w-[300px]">
            <span className="font-bold text-gray-500">Marca</span>
            <input
              className="bg-transparent p-1 border-[1px] rounded-lg border-gray-700 text-gray-300"
              name="brand"
              type="text"
            />
          </label>
          <label className="flex-col flex gap-2 w-[300px]">
            <span className="font-bold text-gray-500">Modelo</span>
            <input
              className="bg-transparent p-1 border-[1px] rounded-lg border-gray-700 text-gray-300"
              name="model"
              type="text"
            />
          </label>
          <label className="flex-col flex gap-2 w-[300px]">
            <span className="font-bold text-gray-500">Año</span>
            <input
              className="bg-transparent p-1 border-[1px] rounded-lg border-gray-700 text-gray-300"
              name="year"
              type="tel"
            />
          </label>
          <label className="flex-col flex gap-2 w-[300px]">
            <span className="font-bold text-gray-500">Color</span>
            <input
              className="bg-transparent p-1 border-[1px] rounded-lg border-gray-700 text-gray-300"
              name="color"
              type="text"
            />
          </label>
          <label className="flex-col flex gap-2 w-[300px]">
            <span className="font-bold text-gray-500">Precio</span>
            <input
              className="bg-transparent p-1 border-[1px] rounded-lg border-gray-700 text-gray-300"
              name="price"
              type="tel"
            />
          </label>
          <div className="w-full flex justify-center ">
            <button className={`${background} min-w-[120px] px-3 py-1 rounded-lg hover:scale-105 text-gray-200`} type="submit">{updateMode ? "Actualizar" : "Crear"} Coche</button>
          </div>
        </form>
        <article className="w-full px-10 flex flex-wrap gap-10 justify-center ">
          {carList.map((car) => (
            <section key={car.id}>
              <CardCar car={car} deleteData={deleteData} handleUpdate={handleUpdate}/>
            </section>
          ))}
        </article>
      </main>
    </>
  );
};
export default FetchApi;
