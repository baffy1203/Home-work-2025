function ServicesManager({
  services,
  masterProfile,
  newService,
  setNewService,
  editingServiceId,
  handleAddService,
  handleEditService,
  handleDeleteService,
}) {
  const availableServices = services.filter(
    (service) =>
      service.category === masterProfile.category
  );

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        Послуги
      </h2>

      <div className="grid md:grid-cols-3 gap-3">
        <input
          placeholder="Назва"
          value={newService.title}
          onChange={(e) =>
            setNewService({
              ...newService,
              title: e.target.value,
            })
          }
          className="bg-[#f7f3f1] p-3 rounded-2xl outline-none"
        />

        <input
          type="number"
          placeholder="Тривалість"
          value={newService.duration}
          onChange={(e) =>
            setNewService({
              ...newService,
              duration: Number(e.target.value),
            })
          }
          className="bg-[#f7f3f1] p-3 rounded-2xl outline-none"
        />

        <input
          type="number"
          placeholder="Ціна"
          value={newService.price}
          onChange={(e) =>
            setNewService({
              ...newService,
              price: Number(e.target.value),
            })
          }
          className="bg-[#f7f3f1] p-3 rounded-2xl outline-none"
        />
      </div>

      <button
        onClick={handleAddService}
        className="mt-4 bg-[#7c5569] text-white px-6 py-3 rounded-2xl hover:opacity-90"
      >
        {editingServiceId
          ? "Зберегти"
          : "Додати послугу"}
      </button>

      <div className="mt-8 flex flex-col gap-3">
        {availableServices.map((service) => (
          <div
            key={service.id}
            className="bg-[#f7f3f1] rounded-2xl p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">
                {service.title}
              </div>

              <div className="text-sm text-gray-500">
                {service.duration} хв • {service.price} грн
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditService(service)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100"
              >
                ✏️
              </button>

              <button
                onClick={() =>
                  handleDeleteService(service.id)
                }
                className="px-4 py-2 rounded-xl bg-red-100 text-red-500 hover:bg-red-200"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesManager;