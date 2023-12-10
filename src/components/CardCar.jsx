const CardCar = ({car, deleteData, handleUpdate}) => {
  
/* 
  const handleUpdate = (car) => {
    setUpdateMode(true)
    handleUpdate(car)
  } */

  return (
    <div className="bg-gray-900 w-56 h-72 rounded-lg px-2 flex flex-col shadow-xl">
      <div className="flex p-2 gap-1">
        <h2 className="w-full text-left text-purple-500 font-bold">Coche</h2>
        <div className="">
          <span className="bg-blue-800 inline-block center w-3 h-3 rounded-full"></span>
        </div>
        <div className="circle">
          <span className="bg-purple-800 inline-block center w-3 h-3 rounded-full"></span>
        </div>
        <div className="circle">
          <span className="bg-pink-800 box inline-block center w-3 h-3 rounded-full"></span>
        </div>
      </div>
      <section className="">
        <ul className="flex flex-col w-full h-52 justify-between p-2">
          <li className="font-semibold">Marca: <span className="text-neutral-300">{car.brand}</span></li>
          <li className="font-semibold">Modelo: <span className="text-neutral-300">{car.model}</span></li>
          <li className="font-semibold">Año: <span className="text-neutral-300">{car.year}</span></li>
          <li className="font-semibold">Color: <span className="text-neutral-300">{car.color}</span></li>
          <li className="font-semibold">Precio: <span className="text-neutral-300">{car.price}</span></li>
        </ul>
        <div className="flex">
          <button
            onClick={() => handleUpdate(car)}
            className="text-blue-800 py-1 px-3 rounded-sm w-[100px]"
          >
            <i className="ri-edit-fill"></i>
          Editar
          </button>
          <button
            onClick={() => deleteData(car.id)}
            className="text-pink-800 py-1 px-3 rounded-sm w-[100px]"
          >
            <i className="ri-delete-bin-2-line"></i>
            Eliminar
          </button>
        </div>
      </section>
    </div>
  );
}
export default CardCar