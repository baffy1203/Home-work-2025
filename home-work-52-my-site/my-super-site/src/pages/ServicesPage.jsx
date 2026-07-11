import { useState, useEffect } from "react";

function Services() {
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem("services");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [editingServiceId, setEditingServiceId] =
    useState(null);

  const [newService, setNewService] = useState({
    title: "",
    duration: 60,
    price: 0,
  });

  useEffect(() => {
    localStorage.setItem(
      "services",
      JSON.stringify(services)
    );
  }, [services]);

  const handleAddService = () => {
    if (!newService.title) return;

    if (editingServiceId) {
      setServices(
        services.map((service) =>
          service.id === editingServiceId
            ? {
                ...service,
                title: newService.title,
                duration: Number(
                  newService.duration
                ),
                price: Number(
                  newService.price
                ),
              }
            : service
        )
      );

      setEditingServiceId(null);
    } else {
      setServices([
        ...services,
        {
          id: Date.now(),
          title: newService.title,
          duration: Number(
            newService.duration
          ),
          price: Number(
            newService.price
          ),
        },
      ]);
    }

    setNewService({
      title: "",
      duration: 60,
      price: 0,
    });
  };

  const handleEditService = (service) => {
    setEditingServiceId(service.id);

    setNewService({
      title: service.title,
      duration: service.duration,
      price: service.price,
    });
  };

  const handleDeleteService = (id) => {
    setServices(
      services.filter(
        (service) => service.id !== id
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#f7f3f1] p-6 rounded-2xl">

        <h2 className="text-3xl font-bold mb-6">
          Мої послуги
        </h2>

        <div className="flex flex-col gap-3">

          <input
            placeholder="Назва послуги"
            value={newService.title}
            onChange={(e) =>
              setNewService({
                ...newService,
                title: e.target.value,
              })
            }
            className="bg-white p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Тривалість"
            value={newService.duration}
            onChange={(e) =>
              setNewService({
                ...newService,
                duration: e.target.value,
              })
            }
            className="bg-white p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Ціна"
            value={newService.price}
            onChange={(e) =>
              setNewService({
                ...newService,
                price: e.target.value,
              })
            }
            className="bg-white p-3 rounded-xl"
          />

          <button
            onClick={handleAddService}
            className="bg-[#7c5569] text-white p-3 rounded-xl"
          >
            {editingServiceId
              ? "Зберегти зміни"
              : "Додати послугу"}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 rounded-xl flex justify-between"
            >
              <span>
                {service.title}
              </span>

              <div className="flex gap-3">
                <span>
                  {service.duration} хв ·
                  {" "}
                  {service.price} грн
                </span>

                <button
                  onClick={() =>
                    handleEditService(service)
                  }
                >
                  ✏️
                </button>

                <button
                  onClick={() =>
                    handleDeleteService(
                      service.id
                    )
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Services;